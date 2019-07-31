---
id: plugin-commands
title: Adding commands to a twasi plugin
sidebar_label: Plugin commands
---

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