---
id: variables
title: Variables
---

## What are Variables

Variables are variable outputs wich you can put in command outputs to create dynamic changing responses of your commands.  

There are two types of variables **standard variables** and **custom variables**.

### Standard variables

We provide the following **standard variables**.

| variable | output |
| --- | --- |
| $sender | The name of the sender who executed the command |
| $streamer | The display name of the streamer |
| $readapi(**URL**) | The text output of the specified **URL** |
| $random | A random viewer |
| $args(**Number**) | The **Number** argument of the executed command |
| $uses | Count of uses of the executed command |
| $viewtime | Time in minutes the executer of the command watched the stream |
| $messages | Count of messages the executer of the command has written |

### Custom variables

With the Plugin **"Variables"** you can create your own variables to use in your commands.  
Just like the standard variables your created variables will be listet in your command add dialog of the panel.  
You can create custom variables by using the **"create new variable"** button under the tab **"variables"**.  

Or by executing the following command

```
!setvar myvariable test
```

1. '!setvar' is the command name.
2. 'myvariable' is the name of the variable.
3. 'test' is the output of the variable.
