import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  // ButtonBuilder,
  ModalSubmitInteraction,
  // TextChannel,
  Colors,
  GuildMember,
  Role,
  ThreadChannel,
  ButtonInteraction,
  // Message,
  // MessageReaction,
  // User,
  // ChatInputCommandInteraction,
  PermissionsBitField,
  // TextChannel,
  // MessageFlags,
  // MessageMentionTypes,
  TextInputStyle,
  TextChannel,
  PermissionResolvable,
  MessageMentionTypes,
} from 'discord.js';
import { stripIndents } from 'common-tags';
import { DateTime } from 'luxon';
import { TicketStatus } from '../../../global/@types/database';
import {
  database,
  getGuild,
  getUser,
} from '../../../global/utils/knex';
import { SlashCommand } from '../../@types/commandDef';
import { embedTemplate } from '../../utils/embedTemplate';
// import {embedTemplate} from '../../utils/embedTemplate';
// import {stripIndents} from 'common-tags';
// import env from '../../../global/utils/env.config';
// import log from '../../../global/utils/log';
import { needsHelpMode, tripSitMe, tripsitmeUserClose } from '../../utils/tripsitme';
import { checkChannelPermissions } from '../../utils/checkPermissions';
// import { modmailDMInteraction } from '../archive/modmail';

const F = f(__filename);

const teamRoles = [
  env.ROLE_DIRECTOR,
  env.ROLE_SUCCESSOR,
  env.ROLE_SYSADMIN,
  env.ROLE_LEADDEV,
  env.ROLE_IRCADMIN,
  env.ROLE_DISCORDADMIN,
  env.ROLE_IRCOP,
  env.ROLE_MODERATOR,
  env.ROLE_TRIPSITTER,
  env.ROLE_TEAMTRIPSIT,
  env.ROLE_TRIPBOT2,
  env.ROLE_TRIPBOT,
  env.ROLE_BOT,
  env.ROLE_DEVELOPER,
];

async function tripsitmodeOn(
  interaction:ChatInputCommandInteraction,
  target:GuildMember,
) {
  if (!interaction.guild) return false;
  if (!interaction.member) return false;

  const guildData = await getGuild(interaction.guild?.id as string);

  // Get the tripsit channel from the guild
  let tripsitChannel = {} as TextChannel;
  try {
    if (guildData.channel_tripsit) {
      tripsitChannel = await interaction.guild?.channels.fetch(guildData.channel_tripsit) as TextChannel;
    }
  } catch (err) {
    // log.debug(F, `There was an error fetching the tripsit channel, it was likely deleted:\n ${err}`);
    // Update the ticket status to closed
    guildData.channel_tripsit = null;
    await database.guilds.set(guildData);
  }

  const channelPerms = await checkChannelPermissions(tripsitChannel, [
    'ViewChannel' as PermissionResolvable,
    'SendMessages' as PermissionResolvable,
    'SendMessagesInThreads' as PermissionResolvable,
    // 'CreatePublicThreads' as PermissionResolvable,
    'CreatePrivateThreads' as PermissionResolvable,
    // 'ManageMessages' as PermissionResolvable,
    'ManageThreads' as PermissionResolvable,
    // 'EmbedLinks' as PermissionResolvable,
  ]);
  if (!channelPerms.hasPermission) {
    log.error(F, `Missing TS channel permission ${channelPerms.permission} in ${tripsitChannel.name}!`);
    const guildOwner = await interaction.guild?.fetchOwner() as GuildMember;
    await guildOwner.send({
      content: stripIndents`Missing permissions in ${tripsitChannel}!
      In order to setup the tripsitting feature I need:
      View Channel - to see the channel
      Send Messages - to send messages
      Create Private Threads - to create private threads
      Send Messages in Threads - to send messages in threads
      Manage Threads - to delete threads when they're done
      `}); // eslint-disable-line
    log.error(F, `Missing TS channel permission ${channelPerms.permission} in ${tripsitChannel.name}!`);
    return false;
  }

  // Get the tripsit meta channel from the guild
  let channelTripsitmeta = {} as TextChannel;
  try {
    // log.debug(F, `guildData.channel_tripsitmeta: ${guildData.channel_tripsitmeta}`);
    if (guildData.channel_tripsitmeta) {
      channelTripsitmeta = await interaction.guild?.channels.fetch(guildData.channel_tripsitmeta) as TextChannel;
    }
  } catch (err) {
    // log.debug(F, `There was an error fetching the tripsit channel, it was likely deleted:\n ${err}`);
    // Update the ticket status to closed
    guildData.channel_tripsitmeta = null;
    await database.guilds.set(guildData);
  }

  const metaPerms = await checkChannelPermissions(channelTripsitmeta, [
    'ViewChannel' as PermissionResolvable,
    'SendMessages' as PermissionResolvable,
    'SendMessagesInThreads' as PermissionResolvable,
    // 'CreatePublicThreads' as PermissionResolvable,
    'CreatePrivateThreads' as PermissionResolvable,
    // 'ManageMessages' as PermissionResolvable,
    'ManageThreads' as PermissionResolvable,
    // 'EmbedLinks' as PermissionResolvable,
  ]);
  if (!metaPerms.hasPermission) {
    log.error(F, `Missing TS channel permission ${channelPerms.permission} in ${channelTripsitmeta.name}!`);
    const guildOwner = await interaction.guild?.fetchOwner() as GuildMember;
    await guildOwner.send({
      content: stripIndents`Missing permissions in ${channelTripsitmeta}!
    In order to setup the tripsitting feature I need:
    View Channel - to see the channel
    Send Messages - to send messages
    Create Private Threads - to create private threads, when requested through the bot
    Send Messages in Threads - to send messages in threads
    Manage Threads - to delete threads when they're done
    `}); // eslint-disable-line
    log.error(F, `Missing permission ${metaPerms.permission} in ${tripsitChannel.name}!`);
    return false;
  }
  // const showMentions = actorIsAdmin ? [] : ['users', 'roles'] as MessageMentionTypes[];

  log.debug(F, `Target: ${target.displayName} (${target.id})`);
  const userData = await getUser(target.id, null, null);
  log.debug(F, `Target userData: ${JSON.stringify(userData, null, 2)}`);
  const [ticketData] = await database.tickets.get(userData.id);
  log.debug(F, `Target ticket data: ${JSON.stringify(ticketData, null, 2)}`);

  // If a thread exists, re-apply needsHelp, update the thread, remind the user
  if (ticketData !== undefined) {
    log.debug(F, `Target has tickets: ${JSON.stringify(ticketData, null, 2)}`);

    let threadHelpUser = {} as ThreadChannel;
    try {
      threadHelpUser = await interaction.guild?.channels.fetch(ticketData.thread_id) as ThreadChannel;
    } catch (err) {
      log.debug(F, 'There was an error updating the help thread, it was likely deleted');
      // Update the ticket status to closed
      ticketData.status = 'DELETED' as TicketStatus;
      ticketData.archived_at = new Date();
      ticketData.deleted_at = new Date();
      await database.tickets.set(ticketData);
      log.debug(F, 'Updated ticket status to DELETED');
      log.debug(F, `Ticket: ${JSON.stringify(ticketData, null, 2)}`);
    }

    log.debug(F, `ThreadHelpUser: ${threadHelpUser.name}`);

    if (threadHelpUser.id) {
      await interaction.deferReply({ ephemeral: true });
      await needsHelpMode(interaction, target);
      log.debug(F, 'Added needshelp to user');
      let roleTripsitter = {} as Role;
      let roleHelper = {} as Role;
      let roleNeedshelp = {} as Role;
      if (guildData.role_tripsitter) {
        roleTripsitter = await interaction.guild?.roles.fetch(guildData.role_tripsitter) as Role;
      }
      if (guildData.role_helper) {
        roleHelper = await interaction.guild?.roles.fetch(guildData.role_helper) as Role;
      }
      if (guildData.role_needshelp) {
        roleNeedshelp = await interaction.guild?.roles.fetch(guildData.role_needshelp) as Role;
      }
      log.debug(F, `Helper Role : ${roleHelper.name}`);
      log.debug(F, `Tripsitter Role : ${roleTripsitter.name}`);
      log.debug(F, `Needshelp Role : ${roleNeedshelp.name}`);

      // Remind the user that they have a channel open
      // const recipient = '' as string;

      let helpMessage = stripIndents`Hey ${target}, the team thinks you could still use some help, lets continue talking here!`; // eslint-disable-line max-len

      // If the help ticket was created < 5 mins ago, don't re-ping the team
      const createdDate = new Date(ticketData.reopened_at ?? ticketData.created_at);
      const now = new Date();
      const diff = now.getTime() - createdDate.getTime();
      const minutes = Math.floor(diff / 1000 / 60);
      if (minutes > 5) {
        const helperStr = `and/or ${roleHelper}`;
        // log.debug(F, `Target has open ticket, and it was created over 5 minutes ago!`);
        helpMessage += `\n\nSomeone from the ${roleTripsitter} ${guildData.role_helper ? helperStr : ''} team will be with you as soon as they're available!`; // eslint-disable-line max-len
      }
      await threadHelpUser.send({
        content: helpMessage,
        allowedMentions: {
          // parse: showMentions,
          parse: ['users', 'roles'] as MessageMentionTypes[],
        },
      });

      log.debug(F, 'Pinged user in help thread');
      threadHelpUser.setName(`🧡│${target.displayName}'s channel!`);
      log.debug(F, 'Updated thread name');

      // If the meta thread exists, update the name and ping the team
      if (ticketData.meta_thread_id) {
        let metaMessage = '';
        if (minutes > 5) {
          const helperString = `and/or ${roleHelper}`;
          metaMessage = `Hey ${roleTripsitter} ${guildData.role_helper ?? helperString} team, ${interaction.member} has indicated that ${target.displayName} needs assistance!`; // eslint-disable-line max-len
        } else {
          metaMessage = `${interaction.member} has indicated that ${target.displayName} needs assistance!`;
        }
        // Get the tripsit meta channel from the guild
        let metaThread = {} as ThreadChannel;
        try {
          metaThread = await interaction.guild?.channels.fetch(ticketData.meta_thread_id) as ThreadChannel;
          metaThread.setName(`🧡│${target.displayName}'s discussion!`);
          await metaThread.send({
            content: metaMessage,
            allowedMentions: {
              // parse: showMentions,
              parse: ['users', 'roles'] as MessageMentionTypes[],
            },
          });
          log.debug(F, 'Pinged team in meta thread!');
        } catch (err) {
          // log.debug(F, `There was an error fetching the tripsit channel, it was likely deleted:\n ${err}`);
          // Update the ticket status to closed
          ticketData.meta_thread_id = null;
          await database.tickets.set(ticketData);
        }
      }

      ticketData.status = 'OPEN' as TicketStatus;
      ticketData.reopened_at = new Date();
      ticketData.archived_at = env.NODE_ENV === 'production'
        ? DateTime.local().plus({ days: 7 }).toJSDate()
        : DateTime.local().plus({ minutes: 1 }).toJSDate();

      ticketData.deleted_at = env.NODE_ENV === 'production'
        ? DateTime.local().plus({ days: 14 }).toJSDate()
        : DateTime.local().plus({ minutes: 2 }).toJSDate();
      await database.tickets.set(ticketData);

      // remind the user they have an open thread
      const embed = embedTemplate()
        .setColor(Colors.DarkBlue)
        .setDescription(stripIndents`Hey ${interaction.member}, ${target.displayName} already has an open ticket!
            I've re-applied the ${roleNeedshelp} role to them, and updated the thread.
            Check your channel list or click '${threadHelpUser.toString()} to see!`);
      await interaction.editReply({ embeds: [embed] });
      return true;
    }
  }

  // If no existing threads are available, create a new one
  await interaction.showModal(new ModalBuilder()
    .setCustomId(`tripsitmeSubmit~${interaction.id}`)
    .setTitle('TripSit Mode Activated!')
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>()
        .addComponents(
          new TextInputBuilder()
            .setCustomId('triageInput')
            .setLabel('What substance did they take, etc?')
            .setPlaceholder('This will be posted in the channel for them to see!')
            .setStyle(TextInputStyle.Short),
        ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder()
        .setCustomId('introInput')
        .setLabel('What\'s going on with them?')
        .setPlaceholder('This will be posted in the channel for them to see!')
        .setStyle(TextInputStyle.Paragraph)),
    ));

  const filter = (i:ModalSubmitInteraction) => i.customId.startsWith('tripsitmeSubmit');
  await interaction.awaitModalSubmit({ filter, time: 0 })
    .then(async i => {
      if (i.customId.split('~')[1] !== interaction.id) return;
      await i.deferReply({ ephemeral: true });
      const triage = i.fields.getTextInputValue('triageInput');
      const intro = i.fields.getTextInputValue('introInput');

      const threadHelpUser = await tripSitMe(i, target, triage, intro) as ThreadChannel;

      const replyMessage = stripIndents`
      Hey ${i.member}, you activated tripsit mode on ${target.displayName}!
  
      Click here to be taken to their private room: ${threadHelpUser}
  
      You can also click in your channel list to see your private room!`;
      const embed = embedTemplate()
        .setColor(Colors.DarkBlue)
        .setDescription(replyMessage);
      await i.editReply({ embeds: [embed] });
    });

  return true;
}

export const tripsitmode: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('tripsitmode')
    .setDescription(
      'This command will apply the NeedsHelp role onto a user, and remove other roles!',
    )
    .addSubcommand(subcommand => subcommand
      .setName('on')
      .setDescription('Turn on tripsit mode for a user')
      .addUserOption(option => option
        .setName('user')
        .setDescription('Member to modify')
        .setRequired(true)))
    .addSubcommand(subcommand => subcommand
      .setName('off')
      .setDescription('Turn off tripsit mode for a user')
      .addUserOption(option => option
        .setName('user')
        .setDescription('Member to modify')
        .setRequired(true))),
  async execute(interaction:ChatInputCommandInteraction) {
    log.info(F, await commandContext(interaction));
    const enable = interaction.options.getSubcommand() as 'on' | 'off';

    const target = interaction.options.getMember('user') as GuildMember;

    // Team check - Cannot be run on team members
    // If this user is a developer then this is a test run and ignore this check,
    // but we'll change the output down below to make it clear this is a test.
    let targetIsTeamMember = false;
    if (!target.permissions.has(PermissionsBitField.Flags.Administrator)) {
      target.roles.cache.forEach(async role => {
        if (teamRoles.includes(role.id)) {
          targetIsTeamMember = true;
        }
      });
      if (targetIsTeamMember) {
        // log.debug(F, `Target is a team member!`);
        const teamMessage = stripIndents`You are a member of the team and cannot be publicly helped!`;
        const embed = embedTemplate()
          .setColor(Colors.DarkBlue)
          .setDescription(teamMessage);
        if (!interaction.replied) {
          await interaction.reply({ embeds: [embed] });
        }
        return false;
      }
    }

    if (enable === 'on') {
      tripsitmodeOn(interaction, target);
    }

    if (enable === 'off') {
      const testInteraction = {
        client: interaction.client,
        id: interaction.id,
        customId: `tripsitmodeOffOverride~${target.id}`,
        guild: interaction.guild,
        member: interaction.member,
        user: interaction.user,
        channel: interaction.channel,
        deferReply: content => interaction.deferReply(content),
        reply: content => {
          if (interaction.deferred || interaction.replied) {
            return interaction.followUp(content);
          }
          return interaction.reply(content);
        },
        editReply: content => interaction.editReply(content),
        followUp: content => interaction.followUp(content),
        showModal: modal => interaction.showModal(modal),
        awaitModalSubmit: params => interaction.awaitModalSubmit(params),
      } as ButtonInteraction;
      tripsitmeUserClose(testInteraction);
    }
    return true;
  },
};

export default tripsitmode;
