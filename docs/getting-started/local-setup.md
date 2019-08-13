---
id: local-setup
title: Setting up a local Twasi-Core instance for development
sidebar_label: Local Twasi setup
---

To test (or even use) your plugin on your local machine, 
you need to have our main component Twasi-Core set up locally.

## Installing Java
To run Twasi-Core, you need to have Java installed on your machine.
We develop and test Twasi-Core using **JDK 1.8** (OpenJDK build), which can be
found [here](https://github.com/ojdkbuild/ojdkbuild/releases).

> Plugin development should also work fine in newer versions, however we do not
recommend to use newer language features, since the plugin will be ran on **JDK 1.8**
in our environment.

## Installing MongoDB
Another component that Twasi-Core depends on is the database. Currently, only
MongoDB is supported. The installation is quite straight-forward, just head
over to the [official MongoDB-Docs](https://docs.mongodb.com/manual/installation/) for a walk-trough.

> Make sure to download & install the community edition, which is sufficient to suit our needs.

It is not required to set up authentication on MongoDB (per default this is **disabled** anyway),
since it will only allow connections from the local computer.

## Fetching Twasi-Core
To get the Twasi-Core **.jar**-File, you currently have two options. We recommend
the first one:

### Getting Twasi-Core from Artifactory
Using your favourite web browser, head over to https://artifactory.twasi.net/artifactory/libs-snapshot-local/net/twasi/TwasiCore/

Select the newest version (0.0.1-SNAPSHOT at the time of writing) and click on the link.

Inside the next folder, search the newest **.jar**-File (it should be the second last file in the list),
with the last file having the extension **.pom**, and download it.

### Getting Twasi-Core from Source
Clone the repository https://github.com/Twasi/twasi-core.git:
```bash
git clone https://github.com/Twasi/twasi-core.git
```

Inside the newly created directory, issue the following maven command to build
the **JAR**-file from source:
```bash
mvn clean compile assembly:single
```

Now the finished file should be placed under ```target/TwasiCore-0.0.1-SNAPSHOT-jar-with-dependencies.jar```

## Initial start
Move the fetched **JAR**-File to a directory dedicated to Twasi-Core.

Open up a command line and start Twasi-Core using (assuming you named the file ```twasi-core.jar```:
```bash
java -jar twasi-core.jar
```

## Adapt configuration
TODO