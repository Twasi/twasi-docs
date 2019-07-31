---
id: twasi-variable
title: The Twasi-Variable
---

> This documentation is not related to the twasi-variables-plugin that allows users to create their own variables. Here you can learn about the variables that can be registered by Twasi-Plugins.

## What is a Twasi-Variable?

Twasi-Variables can make the output of commands the user added dynamic. They can be added by plugins and are resolved by controller classes.

## What does a Twasi-Variable consist of?

Twasi-Variables consist of three main parts:

- The prefix ('$' by default - can **not** be changed at the moment)
- The variable name
- Comma separated custom arguments

#### Example

```
$urlfetch(https://any-web-address.com, 120)
```

1. '$' is the variable prefix.
2. 'urlfetch' is the variable name
3. '()' is the indicator for variable arguments (optional)
4. 'https://any-web-address.com' is the first argument
5. '120' is the second argument.

> If a variable does not require any parameters the brackets are optional. Use **\$song** instead of **\$song()**

## Name restrictions

Twasi-Variables must have an alphanumeric name of any length. Upper and lower case doesn't matter.

### Examples for valid names

- a
- fetchurl
- this1is2a3test4
- 45
- a1B2
- A1b2

## Nesting

Twasi's variable parser is smart enough to detect nested variables. Inner variables will always be parsed before outer variables.

### Example

Imagine you have a command called **!checkbalance** to check the balance of another user. The command's return output could be the following:

```
$balance($args(1))
```

Where $balance returns the balance of the sending user (if no argument is passed) or of the user specified in the first argument. $args returns all of the command arguments as one string. If a number is specified it splits the arguments and only returns the requested one (1 in this case).

Now you execute your command: **!checkbalance larcce**

The parser will parse the inner variable ('$args(1)') first:

```
$balance(larcce)
```

Then the outer variable:

```
50
```

## Deep parsing

Should a Twasi-Variable return another Twasi-Variable, the returned variable will be parsed too (not unlimited, the parser will abort if parsing goes too deep).