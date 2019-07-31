---
id: twasi-command
title: The Twasi-Command
---

You can use commands to control the bot from your Twitch chat. A command is quite similar to a normal chat message, but starts with a given prefix. Be default this is "!" (you can change that in the twasi.yml file in the root folder of your Twasi-Core instance).

## Implementing commands

There are several ways to implement commands in your plugin:

> Please keep in mind that your plugin will not receive any command it has not registered in it's plugin.yml file.

### The onCommand method

The most basic way is to override the onCommand method in your TwasiUserPlugin class (Take a look [here](/docs/twasi-plugin) for further information).

```java
public class MyAmazingUserPlugin extends TwasiUserPlugin {

    @Override
    public void onCommand(TwasiCommandEvent event) {
        String usedCommand = event.getCommand().getCommandName();
        TwasiLogger.log.debug("Used command: " + usedCommand);
    }
}
```