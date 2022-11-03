import {
  SlashCommandBuilder,
} from 'discord.js';
import {SlashCommand1} from '../../@types/commandDef';
import {embedTemplate} from '../../utils/embedTemplate';
import {warmline} from '../../../global/commands/g.warmline';
// import logger from '../../../global/utils/logger';
// import * as path from 'path';
// const PREFIX = path.parse(__filename).name;

export const dWarmline: SlashCommand1 = {
  data: new SlashCommandBuilder()
    .setName('warmline')
    .setDescription('(USA only) Need someone to talk to, but don\'t need a "hotline"?'),

  async execute(interaction) {
    const emsInfo = await warmline();
    const embed = embedTemplate()
      .setTitle(`Need someone to talk to, but don\'t need a "hotline"?`);

    embed.setTitle('EMS Information');
    for (const entry of emsInfo) {
      embed.addFields(
        {
          name: `${entry.name} ${entry.country ? `(${entry.country})` : ``}`,
          value: `${entry.website ? `
            [Website](${entry.website})` : ``}\
            ${entry.webchat ? `
            [Webchat](${entry.website})` : ``}\
            ${entry.phone ? `
            Call: ${entry.phone}` : ``}\
            ${entry.text ? `
            Text: ${entry.text}` : ``}\
          `, inline: true,
        },
      );
    }
    interaction.reply({embeds: [embed]});
    return true;
  },
};