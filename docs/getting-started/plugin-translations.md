---
id: plugin-translations
title: Adding translations to a Twasi-Plugin
sidebar_label: Plugin translations
---

Twasi-Plugins can (and should) be multilingual. That's why we introduced a translation system into the plugin-framework.

## The TwasiTranslation (old system)

The first version of our translation system used the benefits of the *String.format()* function that ships with the JDK:

**EN_GB.lang**:
```
commands.balance=Hello %s, you have already collected %d %s!
```

**DE_DE.lang**:
```
commands.balance=Hallo %s, du hast bereits %d %s gesammelt!
```

And in code:

```java
    public boolean execute(TwasiCustomCommandEvent event) {
        // Get the parameter values
        int money = getBankAccountValue(event.getSender());
        String currencyName = getCurrencyName();
        // And reply, specifying all paramters
        event.reply(getTranslation('commands.balance',
                event.getSender().getDisplayName(),
                money,
                currencyName
            )
        );
    }
```

This works fine in most cases, but languages can be very different in their structure. This system enforces the same sequence of parameters across all languages, which can cause ugly sentences. Also the translations are not very readable.

This is why we created the TranslationRenderer 🙌

## The TranslationRenderer (new system)

The main goal of the TranslationRenderer is to keep translations readable and flexible for the developers and the translators. It is powered by parameter binding and object mapping to be as simple as possible.

### How does it work?

The translation system in general stays the same. Language files containing the translation keys and their translations are stored in the 'resource/translations' directory. Instead of '%d' or '%s' there are now parameters with useful names that do not have to fit the same sequence across all languages.

#### Example

**EN_GB.lang**:
```
commands.balance=Hello {sender.displayName}, you have already collected {amount} {currencyName}!
```

**DE_DE.lang**:
```
commands.balance=Hallo {sender.displayName}, du hast bereits {amount} {currencyName} gesammelt!
```

And in code:

```java
    public boolean execute(TwasiCustomCommandEvent event) {

        // Get the renderer
        TranslationRenderer renderer = event.getRenderer();
        
        // Now bind all parameters
        renderer.bind('amount', getBankAccountValue(event.getSender()));
        renderer.bind('currencyName', getCurrencyName());
        
        // And send the rendered key back
        event.reply(renderer.render('commands.balance');
    }
```

Don't be confused about not binding 'sender.displayName', just keep reading...

### Static binding

Static binding is the most simple binding method for the TranslationRenderer. You define what to bind and give it a name.

#### Example

```java
    public boolean execute(TwasiCustomCommandEvent event) {
        TranslationRenderer renderer = event.getRenderer();

        // This binds "Jeff, my name's Jeff." to {jeff}
        renderer.bind("jeff", "Jeff, my name's Jeff.");

        // This binds "120" to {value} and {result}
        renderer.multiBind("120", "value", "result");
    }
```

### Object mapping

The TranslationRenderer supports object mapping. That means that we could bind any object to it and can get the values of either functions or fields of the object by selecting them with dots.

'sender' is the default binding of the *TwitchAccount*-Object of the command executor. The *TwitchAccount*-class has a function called *getDisplayName()* that returns (obviously) the display name of the user who executed the command.

This works with public functions and public fields. It also works on multiple levels so you could render something like {object.subObject.subSubObject}.

The TranslationRenderer is also kinda smart resolving those bindings. You don't have to worry about upper- or lowercase and also you can ignore the function prefixes 'get', 'is' and 'has'. All of this is possible thanks to Java Reflections ｡◕‿◕｡

#### Example

```java
    public boolean execute(TwasiCustomCommandEvent event) {
        TranslationRenderer renderer = event.getRenderer();

        renderer.bindObject("sender", sender);
        renderer.multiBind(user.getTwitchAccount(), "user", "streamer");
    }
```

### Dynamic binding

#### Example

Will be documented soon. Promised!

### Default bindings

You get the renderer directly from the incoming command event. This allows Twasi to bind variables and objects that are used very often, in the background.

The following default bindings are available:

| name | type | data type | description |
| --- | --- | --- | --- |
| sender | object | TwitchAccount | The TwitchAccount of the user who executed the command. |
| command | static | String | The command name. |
| args | static | String | All command arguments as one string. |
| args.(x) | static | String | A specific argument (*args.1* for the first arg). |
| user/streamer | object | TwitchAccount | The streamer's TwitchAccount. |
| lang/language | static | String | The name of the used language. |
| ver/version | static | String | The current Twasi-Core version. |
| date | dynamic | String | Localized date string. |
| time/clocktime | dynamic | String | The current time (24hr format HH:mm). |

### Nesting translation bindings

The TranslationRenderer supports nesting bindings. The inner bindings will always be resolved first.

#### Example

```
{sender.{field}}
```

If there was a binding called 'field' with the value 'userName', the renderer would first parse {field}:

```
{sender.userName}
```

And then resolve the outer binding.

This can be done on multiple levels without limitations.

### Random translations

If your plugin should return a random sentence, you can declare your syntax key multiple times and call the *renderRandom(String key)*-function.

#### Example

**EN_GB.lang**:

```
my.translation.key=Hello {user.displayNmame}
my.translation.key=Hey, {user.displayName}. How are you?
my.translation.key=I say hi to {user.displayName}!
```

And in code:

```java
    public boolean execute(TwasiCustomCommandEvent event) {
        TranslationRenderer renderer = event.getRenderer();

        // This always returns the first sentence
        String translation = renderer.render("my.translation.key");

        // But this always picks a random one of the three sentences
        String randomTranslation = renderer.renderRandom("my.translation.key");
    }
```

## Fallback translations

No matter if you use the old or the new system, the EN_GB.lang file is always the fallback language file that will be used if either the used key is not available in the requested language or the language file doesn't exist at all.

This is why all plugins should contain a complete English translation.

## Default translation keys

Some translation keys are reserved and should not be used for anything else.

### Plugin information keys

To localize your plugin information you can use the following translation keys:

| key | description |
| --- | --- |
| plugin.name | The plugin name that is shown in the plugin store of Twasi-Panel. |
| plugin.description | The plugin description that is shown in the plugin store of Twasi-Panel. |
| plugin.helptext | The plugin helptext that is shown in the plugin store of Twasi-Panel. |

### Plugin permission descriptions

> This is not implemented yet but will be implemented soon!

It's not always clear which permissions a permission key *exactly* grants. You should give all of your translation keys a clear name to make everyone understand them. These should also be localized, so we add them to our translation files with a leading '§'.

#### Example

If you want to describe the following permission key:

```
commands.add
```

your translation should look like this:

```
§commands.add=Add new commands to the channel
```

## Continue

In the [next part](/docs/getting-started/plugin-variables) of the "Getting started" series you will learn how to add variables to your plugin!