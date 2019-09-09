---
id: commands
title: Commands
sidebar_label: Commands
---

## What are Commands

You can use commands to control the bot from your Twitch chat. A command is quite similar to a normal chat message, but starts with a given prefix. By default this is "!" but with twasi you can use every prefix or leave it empty if you want.

There are two types of commands **standard commands** and **custom commands**.  
**Standard commands** depend on your installed plugins.

### Standard commands

The following **standard commands** are available through the listed plugins.

| plugin | command | parameters | output |
| --- | --- | --- | --- |
| *Quotes* | !quote | **param 1:** add / quote id / none <br/>**param 2:** quote | add / show quotes with the current timestamp, game and the name of the executor |
| *Reactions* | !reactions | **param 1:** add / del / list <br/>**param 2:** name | add / delete / list reactions (commands wich dont have to be at the beginning) |
| *Variables* | !setvar | **param 1:** variable <br/>**param 2:** output | Set or update a variable |
| *Variables* | !delvar | **param 1:** variable | Deletes the specified Variable |
| *Commands* | !add | **param 1:** command <br/>**param 2:** output | Add a command |
| *Commands* | !edit | **param 1:** command <br/>**param 2:** new output | Updates the specified command |
| *Commands* | !del | **param 1:** command | Deletes the specified command |
| *Commands* | !commands | | Shows the list of custom commands |
| *Commands* | !setaccess | **param 1:** command <br/>**param 2:** accesslevel (Broadcaster / Moderator / VIP / Subscriber / Follower / Viewer) | Sets the access of the sepcified command |
| *Utilities* | !check | | Shows how long the executor of the command follows the channel of the streamer |
| *Utilities* | !wiki | **param 1:** search string | Shows a wikipedia article based on the search string |
| *Utilities* | !title | **param 1:** new title / none | Changes / shows the current title of the stream |
| *Utilities* | !game | **param 1:** new category / none | Changes / shows the current category of the stream |
| *Utilities* | !uptime | | Shows how long the current stream has been live |
| *Utilities* | !hosts | | Shows a list of channels who are hosting the current stream |
| *Translator* | !translate | **param 1:** target language <br/>**param 2:** String to translate | Translates a the specified string to a target language |
| *TimedMessages* | !timer | **param 1:** add / delete / enable / disable / list <br/>**param 2:** command <br/>**param 3:** Interval in minutes | Creates a timer based on any command (custom and standard) |

### Custom commands

Custom Twasi-commands are made up of three main parts:

- The prefix ('!' by default)
- The command name
- The arguments (optional)

#### Example

```
!add !ping pong
```

1. '!' is the prefix of the command.
2. 'add' is the command name.
3. '!ping' is the first argument.
4. 'pong' is the second argument.
