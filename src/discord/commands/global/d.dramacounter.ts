import {
  time,
  SlashCommandBuilder,
} from 'discord.js';
import {dramacounter} from '../../../global/commands/g.dramacounter';
import {startLog} from '../../utils/startLog';
import {embedTemplate} from '../../utils/embedTemplate';
import {DateTime} from 'luxon';
import {SlashCommand} from '../../@types/commandDef';
import {parseDuration} from '../../../global/utils/parseDuration';
import log from '../../../global/utils/log';
import {parse} from 'path';
import {stripIndents} from 'common-tags';
const PREFIX = parse(__filename).name;

export const bug: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('dramacounter')
    .setDescription('How long since the last drama incident?!')
    .addSubcommand((subcommand) => subcommand
      .setName('get')
      .setDescription('Get the time since last drama.'),
    )
    .addSubcommand((subcommand) => subcommand
      .setName('set')
      .setDescription('Set the dramacounter >.<')
      .addStringOption((option) => option
        .setName('dramatime')
        .setDescription('When did the drama happen? "3 hours (ago)"')
        .setRequired(true),
      )
      .addStringOption((option) => option
        .setName('dramaissue')
        .setDescription('What was the drama? Be descriptive, or cryptic.')
        .setRequired(true),
      ),
    ),
  async execute(interaction) {
    startLog(PREFIX, interaction);
    log.debug(`[${PREFIX}] starting!`);
    const command = interaction.options.getSubcommand() as 'get' | 'set';

    if (!interaction.guild) {
      interaction.reply({
        content: 'This command can only be used in a server.',
        ephemeral: true,
      });
      return false;
    }
    // log.debug(`[${PREFIX}] interaction.guild: ${JSON.stringify(interaction.guild, null, 2)}`);

    const dramaVal = interaction.options.getString('dramatime');
    log.debug(`[${PREFIX}] dramaVal: ${JSON.stringify(dramaVal, null, 2)}`);
    if (!dramaVal) {
      interaction.reply({
        content: 'You need to specify a time for the drama to have happened.',
        ephemeral: true,
      });
      return false;
    }
    const dramatimeValue = await parseDuration(dramaVal);
    log.debug(`[${PREFIX}] dramatimeValue: ${JSON.stringify(dramatimeValue, null, 2)}`);
    const dramaReason = interaction.options.getString('dramaissue');
    log.debug(`[${PREFIX}] dramaIssue: ${JSON.stringify(dramaReason, null, 2)}`);
    if (!dramaReason) {
      interaction.reply({
        content: 'You need to specify what the drama was.',
        ephemeral: true,
      });
      return false;
    }

    const dramaDate = DateTime.now().minus(dramatimeValue).toJSDate();
    log.debug(`[${PREFIX}] dramaTime: ${JSON.stringify(dramaDate, null, 2)}`);

    const response = await dramacounter(command, interaction.guild.id, dramaDate, dramaReason);

    const embed = embedTemplate()
      .setTitle('Drama Counter');

    if (command === 'get') {
      embed.setDescription(
        `The last drama was ${time(new Date(response[1]), 'R')}: ${response[0]}`);
      await interaction.reply({embeds: [embed]});
    } else {
      embed.setDescription(stripIndents`The drama counter has been reset to ${time(new Date(response[1]), 'R')} ago, \
      and the issue was: ${response[0]}`);
      await interaction.reply({embeds: [embed], ephemeral: true});
    }
    return true;
  },
};
