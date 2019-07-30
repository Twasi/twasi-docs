---
id: twasi-plugin
title: The Twasi-Plugin
---

Twasi itself does not provide many features to use in the Twitch chat. Instead it loads plugins that contain these features bundled in a .jar file.

## The Twasi-Plugin-Framework

Twasi-Core contains the Twasi-Plugin-Framework. This is a Java framework for building Twasi-Features as easy as possible. You can include it using the Java dependency injection system "Maven" since Twasi Core is deployed on our [public Maven Artifactory](https://artifactory.twasi.net).

## What does a Twasi-Plugin consist of?

### The TwasiPlugin class

Every Twasi-Plugin has a main class that is loaded by the Twasi core. This class needs to extend the "TwasiPlugin" class of Twasi core. It is the main interface for interacting with the core.

It consists of the following methods and functions that can be overridden:


 | Name | Return type | Must be overridden | Description | 
 | --- | --- | --- | --- | 
 | getUserPluginClass() | Class<? extends TwasiUserPlugin> | Yes | Returns the class that will be instantiated for each user that has the plugin installed. | 
 | onActivate() | void | No | An event handler that will be called when the plugin is activated. | 
 | onDeactivate() | void | No | An event handler that will be called when the plugin is deactivated. | 
 | onReady() | void | No | An event handler that will be called when the plugin is ready. | 
 | getGraphQLResolver() | GraphQLQueryResolver | No | If your plugin provides API endpoints for the public GraphQL-API, you need to return your GraphQL-Resolver here. | 

### The TwasiUserPlugin class

The TwasiPlugin class is instantiated once when the plugin is loaded. It has a function that must be overridden called "getUserPluginClass()" that returns a class extending the TwasiUserPlugin class. This class will now be instantiated foreach Twasi-User who has the plugin installed. The idea behind this is simplicity for the developers. You can temporarily store information and context that belongs to a channel in class variables of your userplugin class and do not have to put these information in Maps or something similar.

It consists of the following methods and functions that can be overridden:

 | Name | Return type | Description | 
 | --- | --- | --- | 
 | onEnable(TwasiEnableEvent) | void | An event handler that will be called when the UserPlugin is enabled (After restarting the core). | 
 | onDisable(TwasiDisableEvent) | void | An event handler that will be called when the UserPlugin is disabled (When stopping the core). | 
 | onInstall(TwasiInstallEvent) | void | An event handler that will be called when the UserPlugin is plugin is installed. | 
 | onUninstall(TwasiInstallEvent) | void | An event handler that will be called when the UserPlugin is plugin is uninstalled. | 
 | onCommand(TwasiCommandEvent) | void | An event handler that will be called when a command is executed. | 
 | onMessage(TwasiMessageEvent) | void | An event handler that will be called when a message is sent to the user's chat (ignoring the bot's messages). | 

**None of them must be overridden**

> Overriding the onCommand method will disable the command registration system which is highly recommended to use due to it's flexibility.

> If you want to use the onMessage method you need to set "messageHandler" to true in your plugin.yml file.

### The plugin.yml file

To make Twasi understand your plugin you need to put a plugin.yml file into your resource folder (or directly into your jar-file). This file contains basic information about the plugin and tells the core which commands, permissions and API-endpoints are available. We will come to these things later.

#### Example plugin.yml
This is an example of how a simple plugin.yml file could look like:

```yml
name: "My cool plugin"
author: "DieserMerlin"
main: net.twasiplugin.example.ExamplePlugin
version: "1.0"
description: "An example plugin"
commands:
    - test
permissions:
    - exampleplugin.test
```

#### plugin.yml properties

The following settings are available:
 | name | type | description | required | 
 | --- | --- | --- | --- | 
 | name | string | The unique name of the plugin. Should not be changed later. | yes | 
 | description | string | A short description of the plugin. | no | 
 | author | string | The author's name. | yes | 
 | version | string | The current version of the plugin. | yes | 
 | main | string | The full path to your TwasiPlugin class including the package. | yes | 
 | helpText | string | An explaination how your plugin works. | no | 
 | api | string | GraphQL API definitions. | no | 
 | messageHandler | boolean | Whether the plugin should receive all messages. | no | 
 | dynamicCommandNames | boolean | Whether the plugin should listen to all commands. | no | 
 | dependency | boolean | Whether the plugin is a TwasiDependency. | no | 
 | hidden | boolean | Whether the plugin should be hidden from the plugin store. | no | 
 | autoInstall | boolean | Whether the plugin should automatically install. | no | 
 | commands | string[] | A list of all command names. | no | 
 | permissions | string[] | A list of all permission keys the plugin uses. | no | 
 | dependencies | string[] | Other Twasi-Plugins that the plugin depends on.|no |

 > While the name of the plugin is required (because it's the "id" of the plugin) the description and the helptext are not. The reason is that you can provide these localized in the translation files of the plugin later.

 > hidden and autoInstall should not be used in most cases. They were implemented to create plugins that are always installed like the Debug-Plugin or the StreamTracker.

### Plugin configurations

If your plugin needs a configuration file you can create a plugin configuration class. Twasi will automatically create the file for you based on the template you specify.

> **Possible use case:**
> Your plugin integrates with a third party API and needs API credentials. Instead of hardcoding them you can create a configuration file where the instance hoster can put them in.

#### The template class

You need to define the properties your configuration file should contain in a class like this:

```java
public class MyPluginConfiguration {

    public String API_KEY = "API_TOKEN";
    public String API_SECRET = "API_SECRET";
    public String[] SCOPES = {};

}
```

In your TwasiPluginClass you can now pass this template to Twasi by defining a type parameter and get the configuration using the *getConfiguration()* method:

```Java
public class MyPlugin extends TwasiPlugin<MyPluginConfiguration> {

    @Override
    public void onActivate(){
        MyPluginConfiguration config = this.getConfiguration();
        TwasiLogger.log.debug("API-Token: " + config.API_KEY);
    }

}
```

When the *getConfiguration()* method is called the first time, it will create a yaml file containing all fields of your template in the /plugins/config folder (*plugin-name*.yml). If you define values in the template it will put them as default values into the yaml file.

You can also nest properties by defining a SubClass like this:

```java
public class MyPluginConfiguration {

    public int property = 10;
    public APICredentials API = new APICredentials();

    public class APICredentials {
        public String API_KEY = "API_TOKEN";
        public String API_SECRET = "API_SECRET";
        public String[] SCOPES = {};
    }

}
```

### Translations

Twasi is not restricted to one language. At the moment we support the German and the English language. To support multiple languages Twasi uses translation files (*country-code*.lang) stored in the plugin's resource folder under /translations.

Currently supported languages:
|code|country|
|---|---|
|DE_DE|Germany/Deutschland|
|EN_GB|Great Britain|

They are structured like this:

```
translation.key=This is an example text.
command.output=Hey {sender.displayName}!
```


> You will learn about parameter binding like {sender.displayName} [here](/docs/translations).

translations keys can be chosen by the plugin developer but should be separated by dots.

There are default translation keys that should always be set:

|key|description|
|---|---|
|plugin.name|The localized name of the plugin.|
|plugin.description|The localized description of the plugin.|
|plugin.helptext|The localized helptext of the plugin.|