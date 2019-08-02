---
id: plugin-variables
title: Adding variables to a Twasi-Plugin
sidebar_label: Plugin variables
---

Adding dynamic variables to your plugin is very easy! The best way to explain how it works is a simple example.

## Creating a variable controller-class

We are going to add a variable that returns the current time. We also use an argument to allow the user to specify a custom formatting.

Let's get started creating a new class called *TimeVariable*.

> If you have multiple variables it's a good practise to put them into a package called "variables" or something similar to keep everything cleaned up. 

```java
package de.merlinw.variables;

import net.twasi.core.interfaces.api.TwasiInterface;
import net.twasi.core.models.Message.TwasiMessage;
import net.twasi.core.plugin.api.TwasiUserPlugin;
import net.twasi.core.plugin.api.TwasiVariable;

import java.util.Arrays;
import java.util.List;

public class TimeVariable extends TwasiVariable {
    
    public TimeVariable(TwasiUserPlugin owner) {
        super(owner);
    }

    @Override
    public String process(String name, TwasiInterface inf, String[] params, TwasiMessage message) {
        // This function is used to resolve the variable
    }

    @Override
    public List<String> getNames() {
        return Arrays.asList("time", "timestamp");
    }
}
```

There are two very important functions that you need to override:

- The first one is the *process*-function that will be called when Twasi is going to send a message containing a variable that needs to be resolved. The return type is a string. Twasi will replace the variable with whatever you return here. It has four parameters:
  - 'String name' is the variable name that was used (because variables can have multiple names/aliases).
  - 'TwasiInterface inf' is the TwasiInterface of the user in whose channel the variable is used.
  - 'String[] params' contains all arguments/parameters that were specified in the brackets at the end of the variable name (will be empty if there are no brackets at all).
  - 'TwasiMessage message' is the TwasiMessage we currently reply to.

- The second one is the *getNames*-function that returns every name the variable should have. The first string in the returned list the the main name of your variable that will be shown in variable lists. All other strings are aliases that can be used too but won't be listed.

Now we want to add some logic to our *process*-function:

```java
    @Override
    public String process(String name, TwasiInterface inf, String[] params, TwasiMessage message) {
        SimpleDateFormat hourFormat = new SimpleDateFormat("HH:mm");
        return hourFormat.format(Calendar.getInstance().getTime());
    }
```

Now our variable returns the current time. Let's add a parameter:

```java
    @Override
    public String process(String name, TwasiInterface inf, String[] params, TwasiMessage message) {
        String format = (params.length > 0 ? params[0] : "HH:mm");
        SimpleDateFormat hourFormat = new SimpleDateFormat(format);
        return hourFormat.format(Calendar.getInstance().getTime());
    }
```

If a parameter is specified, the date parser will use it instead of 'HH:mm'.

## Error handling

In most cases you don't need to care about error handling at all. If your *process*-function throws an exception Twasi will automatically resolve the variable with 'ERROR'. If the exception is an *ArrayIndexOutOfBoundsException* Twasi will return 'INSUFFICIENT_PARAMETERS'.

Of course you can implement a custom error handling to provide more useful error-messages:

```java
    @Override
    public String process(String name, TwasiInterface inf, String[] params, TwasiMessage message) {
        String format = (params.length > 0 ? params[0] : "HH:mm");
        SimpleDateFormat hourFormat = new SimpleDateFormat(format);
        try {
            return hourFormat.format(Calendar.getInstance().getTime());
        } catch (Exception e) {
            return "INVALID_FORMAT";
        }
    }
```

## Registering variables

The last step is to register the variable-controller just like the commands in the *TwasiUserPlugin*-class of your plugin like this:

```java
    public ExampleUserPlugin() {
        // Register commands
        registerCommand(ExampleCommand.class);
        registerCommand(ExampleStructuredCommand.class);
        
        // Register variables
        registerVariable(TimeVariable.class);
    }
```

If you changed the signature of your Variable-controller-classes constructor the syntax above will throw an error. You can use this syntax instead:

```java
    registerVariable(new TimeVariable(this, otherParameters));
```

## Continue

In the [next part](/docs/getting-started/plugin-permissions) of the "Getting started" series you will learn how to use permissions in your plugin!