import {
  SlashCommandBuilder,
  GuildMember,
} from 'discord.js';
import {SlashCommand} from '../../@types/commandDef';
import {karma} from '../../../global/commands/g.karma';
import {startLog} from '../../utils/startLog';
// import log from '../../../global/utils/log';
import {parse} from 'path';
const PREFIX = parse(__filename).name;

// const karmaQuotes = require('../../../global/assets/data/karma_quotes.json');

export const birthday: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('karma')
    .setDescription('Keep it positive please!')
    .addSubcommand((subcommand) => subcommand
      .setName('get')
      .setDescription('Get someone\'s karma!')
      .addUserOption((option) => option
        .setName('user')
        .setDescription('User to lookup')
        .setRequired(true),
      ),
    ),
  // .addSubcommand((subcommand) => subcommand
  //     .setName('set')
  //     .setDescription('Set someone\'s karma!')
  //     .addUserOption((option) => option
  //         .setName('user')
  //         .setDescription('User to set')
  //         .setRequired(true),
  //     )
  //     .addNumberOption((option) => option
  //         .setName('value')
  //         .setDescription('How much karma to give/take')
  //         .setRequired(true),
  //     )
  //     .addStringOption((option) => option
  //         .setName('type')
  //         .setDescription('Karma given or received?')
  //         .addChoices(
  //             {name: 'Given', value: 'karma_given'},
  //             {name: 'Received', value: 'karma_received'},
  //         )
  //         .setRequired(true),
  //     ),
  // ),
  async execute(interaction) {
    startLog(PREFIX, interaction);
    let command = interaction.options.getSubcommand() as 'get' | 'set' | undefined;
    let member = interaction.options.getMember('user') as GuildMember;
    // const value = interaction.options.getNumber('value') as number;
    // const type = interaction.options.getString('type') as 'karma_given' | 'karma_received';


    if (command === undefined) {
      command = 'get';
    }

    if (member === null) {
      member = interaction.member as GuildMember;
    }

    const response = await karma(command, member.id, null, null);

    // log.debug(`[${PREFIX}] response: ${response}`);

    if (command === 'get') {
      interaction.reply(`${member.displayName} ${response}`);
    } else {
      interaction.reply({content: `${member.displayName} ${response}`, ephemeral: true});
    }
    return true;
  },
};
