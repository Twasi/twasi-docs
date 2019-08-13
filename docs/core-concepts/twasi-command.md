---
id: twasi-command
title: The Twasi-Command
---

> This documentation is not related to the twasi-command-plugin that allows users to create their own commands. Here you can learn more about the commands that can be registered by Twasi-plugins.

## What is a Twasi-command?

You can use commands to control the bot from your Twitch chat. A command is quite similar to a normal chat message, but starts with a given prefix. By default this is "!" (you can change that in the twasi.yml file in the root folder of your Twasi-Core instance).

Twasi-commands can be implemented by using a controller class. This is a class dedicated to executing one certain command. You can learn more about that [here](/docs/getting-started/plugin-commands).

## What does a Twasi-Command consist of?

### Simple commands

Simple Twasi-commands are made up of three main parts:

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

### Advanced commands

The Twasi-plugin-framework offers another type of command called StructuredPluginCommand. This command type was added to keep complex commands structured and the code clean.

Advanced Twasi-commands are made up of four main parts:

- The prefix ('!' by default)
- The command name
- The subcommands (optional)
- The arguments (optional)

#### Example

```
!timer add !hosts 300
```

1. '!' is the prefix of the command.
2. 'timer' is the command name.
3. 'add' is the first subcommand.
4. '!hosts' is the first argument.
5. '300' is the second argument.

The key difference between simple and complex commands is that complex commands can register a command handler for every subcommand they have. Simple commands use only one command handler for everything they can do. This can really mess up the code with if-elses and switch-cases.

## Permissions

Twasi-Commands can require a certain permission key. If the executor/sender of the command doesn't have that permission key, Twasi will ignore the command.

## Cooldown

To prevent overuse of a command, the controller class can specify a cooldown that is applied per user when the command was successfully executed.

### What does 'successfully executed' mean?

**Example**: If you want to know how the **!wiki** command works, you just type in the command without any arguments. This means, that the command was **not** successfully executed, since it only returns the commands syntax and doesn't really execute the command.

Developers can decide if a command was successful or not, using the controller class.

## Aliases

If a command should not only react to one command name, it can define aliases that will execute the command too.