// import { stripIndents } from 'common-tags';
import { Colors } from 'discord.js';
import { dRss } from '../../src/discord/commands/guild/d.rss';
import { executeCommandAndSpyReply, embedContaining, getParsedCommand } from '../utils/testutils';

const slashCommand = dRss;

const authorInfo = {
  iconURL: 'https://fossdroid.com/images/icons/me.tripsit.tripmobile.13.png',
  name: 'TripSit.Me',
  url: 'http://www.tripsit.me',
};
const footerInfo = {
  iconURL: 'https://imgur.com/b923xK2.png',
  text: 'Dose responsibly!',
};

describe(slashCommand.data.name, () => {
  it(slashCommand.data.description, async () => {
    // expect(await executeCommandAndSpyReply(
    //   slashCommand,
    //   getParsedCommand(
    //     `/${slashCommand.data.name} list`,
    //     slashCommand.data,
    //     'tripsit',
    //   ),
    // )).toHaveBeenCalledWith({
    //   embeds: embedContaining({
    //     author: authorInfo,
    //     footer: footerInfo,
    //     color: Colors.Purple,
    //     title: 'TripSit Guild has no RSS feeds!',
    //   }),
    //   ephemeral: true,
    // });

    expect(await executeCommandAndSpyReply(
      slashCommand,
      getParsedCommand(
        `/${slashCommand.data.name} add url:https://www.reddit.com/r/TripSit/new.rss add_to_channel:TextChannel`,
        slashCommand.data,
        'tripsit',
      ),
    )).toHaveBeenCalledWith({
      embeds: embedContaining({
        author: authorInfo,
        footer: footerInfo,
        color: Colors.Green,
        title: 'RSS feed added to TextChannel!',
        description: 'I\'ve started watching https://www.reddit.com/r/TripSit/new.rss!',
      }),
      ephemeral: true,
    });

    expect(await executeCommandAndSpyReply(
      slashCommand,
      getParsedCommand(
        `/${slashCommand.data.name} list`,
        slashCommand.data,
        'tripsit',
      ),
    )).toHaveBeenCalledWith({
      embeds: embedContaining({
        author: authorInfo,
        footer: footerInfo,
        color: Colors.Purple,
        title: 'TripSit Guild has the following RSS feeds:!',
        description: 'https://www.reddit.com/r/TripSit/new.rss -> <#123456789>',
      }),
      ephemeral: true,
    });

    expect(await executeCommandAndSpyReply(
      slashCommand,
      getParsedCommand(
        `/${slashCommand.data.name} remove remove_from_channel:TextChannel`,
        slashCommand.data,
        'tripsit',
      ),
    )).toHaveBeenCalledWith({
      embeds: embedContaining({
        author: authorInfo,
        footer: footerInfo,
        color: Colors.Red,
        title: 'RSS feed removed from TextChannel!',
      }),
      ephemeral: true,
    });

    expect(await executeCommandAndSpyReply(
      slashCommand,
      getParsedCommand(
        `/${slashCommand.data.name} list`,
        slashCommand.data,
        'tripsit',
      ),
    )).toHaveBeenCalledWith({
      embeds: embedContaining({
        author: authorInfo,
        footer: footerInfo,
        color: Colors.Purple,
        title: 'TripSit Guild has no RSS feeds!',
      }),
      ephemeral: true,
    });

    // expect(await executeCommandAndSpyReply(
    //   slashCommand,
    //   getParsedCommand(
    //     `/${slashCommand.data.name} add url:https://www.reddit.com/r/TripSit/new.rss add_to_channel:VoiceChannel`,
    //     slashCommand.data,
    //     'tripsit',
    //   ),
    // )).toHaveBeenCalledWith({
    //   embeds: embedContaining({
    //     author: authorInfo,
    //     footer: footerInfo,
    //     color: Colors.Purple,
    //     title: 'You must specify a text channel!',
    //   }),
    //   ephemeral: true,
    // });

    // expect(await executeCommandAndSpyReply(
    //   slashCommand,
    //   getParsedCommand(
    //     `/${slashCommand.data.name} remove remove_from_channel:VoiceChannel`,
    //     slashCommand.data,
    //     'tripsit',
    //   ),
    // )).toHaveBeenCalledWith({
    //   embeds: embedContaining({
    //     author: authorInfo,
    //     footer: footerInfo,
    //     color: Colors.Red,
    //     title: 'You must specify a text channel!',
    //   }),
    //   ephemeral: true,
    // });

    // expect(await executeCommandAndSpyReply(
    //   slashCommand,
    //   getParsedCommand(
    //     `/${slashCommand.data.name} add url:https://www.google.com add_to_channel:TextChannel`,
    //     slashCommand.data,
    //     'tripsit',
    //   ),
    // )).toHaveBeenCalledWith({
    //   embeds: embedContaining({
    //     author: authorInfo,
    //     footer: footerInfo,
    //     color: Colors.Red,
    //     title: 'You must use a URL ending with .rss!',
    //   }),
    //   ephemeral: true,
    // });

    // expect(await executeCommandAndSpyReply(
    //   slashCommand,
    //   getParsedCommand(
    //     `/${slashCommand.data.name} add url:https://www.google.com.rss add_to_channel:TextChannel`,
    //     slashCommand.data,
    //     'tripsit',
    //   ),
    // )).toHaveBeenCalledWith({
    //   embeds: embedContaining({
    //     author: authorInfo,
    //     footer: footerInfo,
    //     color: Colors.Red,
    //     title: 'This is not a valid RSS URL, please check it and try again!',
    //   }),
    //   ephemeral: true,
    // });
  });
});
