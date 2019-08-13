---
id: home
title: Twasi Documentation for Developers
sidebar_label: Home
---

This is the developer section of this documentation. If you are not a developer please click [here](/docs/users/home).

## Welcome

to the official documentation of Twasi. This is the developer section which is dedicated to Java developers who are interested in Twasi-Plugin development.

Twasi uses the modularity of Java. This documentation requires basic to enhanced experience with the Java programming language - depending on how complex a plugin should be. If you are not familiar with Java you propably won't be able to follow this documentation, but there are a lot of free beginner-friendly Java tutorials out there on the internet!

## What is Twasi?

Twasi is an open source chatbot for the video-livestreaming platform Twitch. It is developed in our free time and will always be free to use. We offer a framework that can be used to develop custom functions for the bot very easily. If you want to learn more you're in the right place!

### Twasi-Core

This is the main application of Twasi. It handles the connection to Twitch, loads the plugins that contain the features of Twasi and connects everything together (including Twasi-Panel and the database). Twasi-Core can be seen as the heart of Twasi.

### Twasi Plugins

Twasi is a completely modular application. The functionality doesn't provide with the application itself (Twasi-Core), you need the corresponding plugins. This documentation will show you, how to use and create Twasi-plugins and -dependencies using the Twasi-Plugin-Framework which is included in Twasi-Core.

#### Advantages of using a plugin system

- Flexibility
    - You can keep an instance of Twasi as small as possible by only loading the plugins you really need
- Stability
    - If a feature is broken you can just put the plugin out of the plugin folder and everything should work again
    - Debugging is a lot easier because you always know in which plugin to search for the problem

### Twasi-Panel

Twasi-Panel is the frontend application of Twasi. It is using the React framework maintained by Facebook to offer a modern and fast user interface. It runs in all modern browsers and does not require any installation.

## History

The Twasi-Project was started in June 2016 by Blechkelle aka. Jeff after the "Twats"-Chatbot developed by MrKrisKrisu was shut down. After a closed beta, Twasi's first version started an open beta version that failed due to too many users using the bot. Later Twasi was rewritten as Twasi-Core, built by a modular system to offer more flexibility.
