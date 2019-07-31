---
id: plugin-commands
title: Adding commands to a twasi plugin
sidebar_label: Plugin commands
---

There are several ways to implement commands into your plugin:

> Please keep in mind that your plugin will not receive any command it has not registered in it's plugin.yml file.

## The onCommand method (recommended for static commands)

The most basic way is to override the onCommand method in your TwasiUserPlugin class (Take a look [here](/docs/twasi-plugin) if you don't know about the TwasiUserPlugin class).

```java
public class MyAmazingUserPlugin extends TwasiUserPlugin {

    @Override
    public void onCommand(TwasiCommandEvent event) {
        String usedCommand = event.getCommand().getCommandName();
        TwasiLogger.log.debug("Used command: " + usedCommand);
    }
}
```

You can also handle multiple commands using this method, but this should only be used for really simple or static commands, not for more complex command structures.

```java
public class MyAmazingUserPlugin extends TwasiUserPlugin {

    @Override
    public void onCommand(TwasiCommandEvent e) {
        switch (e.getCommand().getCommandName().toLowerCase()) {
            case "test":
                e.getCommand().reply("successful");
                break;
            case "ping":
                e.getCommand().reply("pong");
                break;
        }
    }
}
```

**Warning!** Since the onCommand method calls registered command-controllers (see below), these won't work when you override it.

## Controller-driven commands

It's much cleaner to create a controller class for every command that you register. This way you keep your code clean and separate everything into classes.

> If your plugin has multiple commands, you should create a new package inside of your base package called "commands" or something similar containing all of your command controller classes.

Your command controller will be instantiated once when you register it in your TwasiUserPlugin class. This means that your controller class has one object for each installed channel so you can store context information across one channel in the class variables of it.

### The TwasiPluginCommand-class

Using the TwasiPluginCommand class is recommended for simple and more complex commands. You should be fine with it in most cases. If your command has multiple subcommands you should take a look at the StructuredPluginCommand-class.

To get started add a new class to your project and make it extend the **TwasiPluginCommand**-class:

```java
package de.merlinw.commands;

import net.twasi.core.plugin.api.TwasiUserPlugin;
import net.twasi.core.plugin.api.customcommands.TwasiCustomCommandEvent;
import net.twasi.core.plugin.api.customcommands.TwasiPluginCommand;

public class ExampleCommand extends TwasiPluginCommand {

    public ExampleCommand(TwasiUserPlugin twasiUserPlugin) {
        super(twasiUserPlugin);
    }

    @Override
    protected boolean execute(TwasiCustomCommandEvent event) {
        event.reply("You successfully executed the example command! :o");
        return true;
    }

    @Override
    public String getCommandName() {
        return "example";
    }
    
}
```

You need to have the same constructor as the super class. Otherwise you will run into an error when you try to register your command. Just leave it as is.

The *getCommandName()* function has to be overridden too. Let it return the name of the command (one single word) the controller should react to.

> The command name should not contain the command prefix (which is '!' by default).

The *execute(TwasiCustomCommandEvent event)* function is your main execution function that will always be called when someone executes your command. The returned boolean defines whether the command was successfully executed or not. If the command ran successfully the command cooldown - if specified - is applied to the user who executed the command.

#### Setting up permissions

If the command should require a certain permission key, just override the *requirePermissionKey()* function and let it return the desired key. Twasi-Core will take care of the rest.

This also works for TwasiSubCommands.

#### Setting up a cooldown

Commands have a default cooldown of one minute that is applied to the user and the command when the command was executed successfully. If you want to in-/decrease that cooldown, just override the *getCooldown()* function and let it return the desired duration.

#### Setting up aliases

This is **not** supported yet. It will be supported in the future. Promised!

#### Other settings

**Timers**

Twasi supports timers. Timers are commands that are automatically executes in a given interval while the channel is live. If your command should be available as timer override the *allowsTimer()* function and make it return true.

> This is only useful for non-functional commands. For example the **!hosts** command of the utitlies plugin has timers enabled.

**Listing**

If your command should not be listed when someone executes **!commands** in chat override the *allowsListing()* function and make it return false.

#### Registering the controller

To register your controller just call this function from your TwasiUserPlugin-class (inside of the constructor for example) for each of your commands:

```java
    public ExampleUserPlugin() {
        registerCommand(ExampleCommand.class);
        registerCommand(ExampleStructuredCommand.class);
    }
```

If you changed the constructor signature of your command controller class the syntax above will throw an error. You can use this syntax instead:

```java
    registerCommand(new ExampleCommand(this, otherParameters));
```

### The StructuredPluginCommand-class

The more subcommands your command has ("!command **add**" and "!command **remove**" for example), the more confusing your code becomes. To keep things as clean and readable as possible we introduced the StructuredPluginCommand into our Plugin-Framework.

It works quite similar to the TwasiPluginCommand class but you can specify a bunch of subcommands that Twasi will automatically handle as if they were normal commands. This way you have one controller for each subcommand and do not need tons of if-elses or switch cases.

The StructuredPluginCommand is also multidimensional so you can specify subcommands for your subcommands what makes things a lot easier when you need to provide a complex command structure.

You can start by creating a class extending StructuredPluginCommand:

```java
package de.merlinw.commands;

import net.twasi.core.plugin.api.TwasiUserPlugin;
import net.twasi.core.plugin.api.customcommands.TwasiCustomCommandEvent;
import net.twasi.core.plugin.api.customcommands.structuredcommands.StructuredPluginCommand;
import net.twasi.core.plugin.api.customcommands.structuredcommands.subcommands.SubCommandCollection;

public class ExampleStructuredCommand extends StructuredPluginCommand {

    public ExampleStructuredCommand(TwasiUserPlugin twasiUserPlugin) {
        super(twasiUserPlugin);
    }

    @Override
    protected boolean handle(TwasiCustomCommandEvent event) {
        // This is the command handler for !example without a valid subcommand
    }

    @Override
    public String getCommandName() {
        return "example";
    }

    @Override
    public SubCommandCollection getSubCommands() {
        return null;
    }

}
```

Since the *StructuredPluginCommand*-class extends *TwasiPluginCommand*, all of the functions are the same. The only difference is that the *execute* function is called *handle* in StructuredPluginCommands because the execute-function is working in background. You can find the available functions and methods [here](#setting-up-permissions).

#### Adding subcommands

To add some subcommands to your controller you need to return a SubCommandCollection on the *getSubCommands()* function.

**First subcommand**

```java
package de.merlinw.commands.example_subcommands;

import net.twasi.core.plugin.api.customcommands.TwasiCustomCommandEvent;
import net.twasi.core.plugin.api.customcommands.structuredcommands.TwasiStructuredCommandEvent;
import net.twasi.core.plugin.api.customcommands.structuredcommands.subcommands.ISubCommands;
import net.twasi.core.plugin.api.customcommands.structuredcommands.subcommands.TwasiSubCommand;

public class FirstSubCommand extends TwasiSubCommand {

    public FirstSubCommand(TwasiCustomCommandEvent event, ISubCommands parent) {
        super(event, parent);
    }

    @Override
    protected boolean handle(TwasiStructuredCommandEvent event) {
        event.reply(event.getArgs().get(0));
        return true;
    }

    @Override
    public String getCommandName() {
        return "first";
    }
}
```

**Second subcommand**

```java
package de.merlinw.commands.example_subcommands;

import net.twasi.core.plugin.api.customcommands.TwasiCustomCommandEvent;
import net.twasi.core.plugin.api.customcommands.structuredcommands.TwasiStructuredCommandEvent;
import net.twasi.core.plugin.api.customcommands.structuredcommands.subcommands.ISubCommands;
import net.twasi.core.plugin.api.customcommands.structuredcommands.subcommands.TwasiSubCommand;

public class SecondSubCommand extends TwasiSubCommand {

    public SecondSubCommand(TwasiCustomCommandEvent event, ISubCommands parent) {
        super(event, parent);
    }

    @Override
    protected boolean handle(TwasiStructuredCommandEvent event) {
        event.reply("This is the second subcommand!");
        return true;
    }

    @Override
    public String getCommandName() {
        return "second";
    }
}
```

**Parent class**

```java
    @Override
    public SubCommandCollection getSubCommands() {
        return SubCommandCollection.OFCLASSES(
                FirstSubCommand.class,
                SecondSubCommand.class
        );
    }
```

> You can also override the *getSubCommands()* method on subcommand-controllers to add subcommands to your subcommands. ( ͡° ͜ʖ ͡°)

The FirstSubCommand-controller would react to commands like '**!example first**' now. It returns the first command argument. Since subcommands aim to behave like normal commands, the used subcommand name is removed from the argument list automatically. For '**!example first 123**', 123 would be the command output.

Incoming commands that have an invalid subcommand will be handled by the parent class. 

#### Translations

> You will learn about the translation renderer on the next page.

If you don't override the *handle* function it will automatically render and return the translation key '*command-name*.syntax'.

This also works for subcommands. If the example command had a subcommand called 'add', it renders and returns the translation key 'example.add.syntax' by default.

## Continue

In the [next part](/docs/getting-started/plugin-translations) of the "Getting started" series you will learn how to add translations to your plugin!