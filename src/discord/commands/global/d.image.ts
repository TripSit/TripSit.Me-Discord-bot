/* eslint-disable sonarjs/no-duplicate-string */
import {
  Colors,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  TextChannel,
  GuildMember,
  time,
} from 'discord.js';
import { stripIndents } from 'common-tags';
import {
  PrismaClient,
} from '@prisma/client';
import { DateTime } from 'luxon';
import { ImagesResponse } from 'openai/resources';
import { SlashCommand } from '../../@types/commandDef';
import { embedTemplate } from '../../utils/embedTemplate';
import commandContext from '../../utils/context';
import { aiModerateReport, createImage } from '../../../global/commands/g.ai';

const db = new PrismaClient({ log: ['error'] });

const F = f(__filename);

const ephemeralExplanation = 'Set to "True" to show the response only to you';
const imageLimits = {
  [env.ROLE_TEAMTRIPSIT]: 20,
  [env.ROLE_PATREON_TIER_0]: 20,
  [env.ROLE_PATREON_TIER_1]: 40,
  [env.ROLE_PATREON_TIER_2]: 60,
  [env.ROLE_PATREON_TIER_3]: 80,
  [env.ROLE_PATREON_TIER_4]: 100,
};

async function help(
  interaction: ChatInputCommandInteraction,
):Promise<void> {
  const visible = interaction.options.getBoolean('ephemeral') !== false;
  await interaction.deferReply({ ephemeral: !visible });
  await interaction.editReply({
    embeds: [embedTemplate()
      .setTitle('AI Help')
      .setDescription(stripIndents`
        Welcome to TripBot's AI module!
  
        This is not a real AI, this is a Language Learning Model (LLM) that uses OpenAI's API.
        It does not provide any kind of "intelligence", it just knows how to make a sentence that sounds good.
        As such, **do not trust the responses as 100% fact, there is no human oversight to them.**
        GPT3.5 is pretty smart, and chances are it's correct, but it's not guaranteed.
  
        Want to enable the AI in your guild?
  
        **/ai link optional:<channel/thread/category> optional:<toggle>**
        You can link threads, channels, and even entire categories with the AI. (Default: current channel)
        You can toggle the link on or off with the toggle option. (Default: on)
        If you don't provide any options, it will return the current link status of the current channel.
        `)],
  });
}

async function generate(
  interaction: ChatInputCommandInteraction,
):Promise<void> {
  const visible = interaction.options.getBoolean('ephemeral') !== false;
  await interaction.deferReply({ ephemeral: !visible });

  const description = interaction.options.getString('description', true);

  if (!interaction.member) return;

  const guildMember = interaction.member as GuildMember;

  // Find if the user has any of the roles mentioned in imageLimits keys
  const imageLimit = Object.entries(imageLimits).find(limit => guildMember.roles.cache.has(limit[0]));

  if (!imageLimit) {
    await interaction.editReply(
      'This command is exclusive to active TripSit [Patreon](<https://www.patreon.com/tripsit>) subscribers.',
    );
    return;
  }

  const modReport = await aiModerateReport(description);

  log.debug(F, `modReport: ${JSON.stringify(modReport, null, 2)}`);

  const flagged = modReport.results.find(result => result.flagged === true);

  if (flagged) {
    // Go through the flagged.categories and find the ones where the category value is true
    const flaggedCategories = Object.entries(flagged.categories).filter(category => category[1] === true);
    await interaction.editReply(
      `Hold on there there bucko, this request violates OpenAI's usage policies regarding \
      ${flaggedCategories.map(category => category[0]).join(', ')}`,
    );

    return;
  }

  const userData = await db.users.upsert({
    where: { discord_id: guildMember.id },
    create: { discord_id: guildMember.id },
    update: {},
  });

  const aiImageData = await db.ai_images.findMany({
    where: {
      user_id: userData.id,
    },
  });

  // The aiUsageData is a list of dates when images were generated
  // We create a list of images that were generated this month.
  const imagesThisMonth = aiImageData.filter(image => {
    // log.debug(F, `imageDate: ${imageDate}`);
    const givenDate = DateTime.fromJSDate(image.created_at);
    const oneMonthAgo = DateTime.now().minus({ months: 1 });
    return givenDate > oneMonthAgo;
  }).length;

  if (imagesThisMonth > imageLimit[1] && guildMember.id !== env.DISCORD_OWNER_ID) {
    await interaction.editReply(stripIndents`Sorry, you have already generated ${imagesThisMonth} images this month. 
    Check out your /image library to see them all.`);
    return;
  }

  const channelAiImageLog = await discordClient.channels.fetch(env.CHANNEL_AIIMAGELOG) as TextChannel;
  await channelAiImageLog
    .send(`${guildMember.displayName} requested '${description}' in ${interaction.guild?.name}`);

  let imageData = {} as ImagesResponse;

  try {
    imageData = await createImage(
      description,
      guildMember.id,
    );
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).error.code === 'content_policy_violation') {
      await interaction.editReply(`Hold on there there bucko, this request violates OpenAI's usage policies. 
      Try again with something more wholesome.`);
      await channelAiImageLog.send(`${guildMember.displayName}'s request violated OpenAI's usage policies.`);
      return;
    }
    await channelAiImageLog.send(
      `Error generating ${guildMember.displayName}'s image: ${JSON.stringify(error, null, 2)}`,
    );
  }

  log.debug(F, `openAi responded response: ${JSON.stringify(imageData, null, 2)}`);
  const { data } = imageData;
  const [image] = data;
  await db.ai_images.create({
    data: {
      user_id: userData.id,
      prompt: description,
      revised_prompt: image.revised_prompt ?? '',
      image_url: image.url as string,
      model: 'DALL_E_3',
    },
  });

  const newAaiUsageData = await db.ai_images.findMany({
    where: {
      user_id: userData.id,
    },
  });

  const imagesGenerated = newAaiUsageData.length;

  const allUsageData = await db.ai_images.findMany();
  const totalImagesGenerated = allUsageData.length;

  await channelAiImageLog.send({
    embeds: [
      embedTemplate()
        .setAuthor({
          name: guildMember.user.username,
          iconURL: guildMember.displayAvatarURL(),
        })
        .setColor(Colors.Yellow)
        .addFields(
          {
            name: 'Prompt',
            value: stripIndents`${description}`,
            inline: false,
          },
          {
            name: 'Revised Prompt',
            value: stripIndents`${image.revised_prompt}`,
            inline: false,
          },
          {
            name: 'Model',
            value: 'DALL_E_3',
            inline: true,
          },
          {
            name: 'User Images Generated',
            value: `${imagesGenerated} ($${imagesGenerated * 0.04})`,
            inline: true,
          },
          {
            name: 'Total Images Generated',
            value: `${totalImagesGenerated} ($${totalImagesGenerated * 0.04})`,
            inline: true,
          },
        )
        .setImage(image.url as string),
    ],
  });

  await interaction.editReply(
    {
      embeds: [embedTemplate()
        .setAuthor(null)
        .setColor(null)
        .setImage(image.url as string)
        .setFooter({
          text: stripIndents`Beta feature only available to active TripSit Patreon subscribers \
           (${imageLimit[1] - imagesThisMonth} images left).`,
        })],
    },
  );
}

async function library(
  interaction: ChatInputCommandInteraction,
):Promise<void> {
  const visible = interaction.options.getBoolean('ephemeral') !== false;
  await interaction.deferReply({ ephemeral: !visible });
  if (!interaction.member) return;

  const guildMember = interaction.member as GuildMember;

  const userData = await db.users.upsert({
    where: { discord_id: guildMember.id },
    create: { discord_id: guildMember.id },
    update: {},
  });

  const aiImageData = await db.ai_images.findMany({
    where: {
      user_id: userData.id,
    },
  });

  const imagesGenerated = aiImageData.length;

  // Create a string that tells the user the details on each image they have generated

  const imageDetails = aiImageData.map(image => {
    const createdDate = DateTime.fromJSDate(image.created_at).toUnixInteger();
    return `${time(createdDate, 'R')} - [${image.prompt}](<${image.image_url}>)`;
  });

  if (imageDetails.length === 0) {
    await interaction.editReply({
      embeds: [
        embedTemplate()
          .setAuthor({
            name: guildMember.user.username,
            iconURL: guildMember.displayAvatarURL(),
          })
          .setColor(Colors.Yellow)
          .setDescription('You have not generated any images yet.')
          .addFields(
            {
              name: 'Images Generated',
              value: `${imagesGenerated} ($${imagesGenerated * 0.04})`,
              inline: true,
            },
          ),
      ],
    });
    return;
  }

  await interaction.editReply({
    embeds: [
      embedTemplate()
        .setAuthor({
          name: guildMember.user.username,
          iconURL: guildMember.displayAvatarURL(),
        })
        .setColor(Colors.Yellow)
        .setDescription(imageDetails.join('\n'))
        .addFields(
          {
            name: 'Images Generated',
            value: `${imagesGenerated} ($${imagesGenerated * 0.04})`,
            inline: true,
          },
        ),
    ],
  });
}

export const image: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('image')
    .setDescription('TripBot\'s Image Generator')
    .addSubcommand(subcommand => subcommand
      .setDescription('Information on the imagen function.')
      .setName('help'))
    .addSubcommand(subcommand => subcommand
      .setDescription('Generate an image')
      .addStringOption(option => option.setName('description')
        .setDescription('Describe your image.')
        .setRequired(true))
      .addBooleanOption(option => option.setName('ephemeral')
        .setDescription(ephemeralExplanation))
      .setName('generate'))
    .addSubcommand(subcommand => subcommand
      .setDescription('Returns all images you have generated')
      .addBooleanOption(option => option.setName('ephemeral')
        .setDescription(ephemeralExplanation))
      .setName('library')),

  async execute(interaction) {
    log.info(F, await commandContext(interaction));

    const command = interaction.options.getSubcommand().toUpperCase() as 'HELP' | 'GENERATE' | 'LIBRARY';
    switch (command) {
      case 'HELP':
        await help(interaction);
        break;
      case 'GENERATE':
        await generate(interaction);
        break;
      case 'LIBRARY':
        await library(interaction);
        break;
      default:
        help(interaction);
        break;
    }

    return true;
  },
};

export default image;
