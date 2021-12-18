const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");
const Discord = require('discord.js');

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        // Register for a single guild
        await client.guilds.cache.get("916728330294812722").commands.set(arrayOfSlashCommands);

        // Register for all the guilds the bot is in
        // await client.application.commands.set(arrayOfSlashCommands);
    });

    // mongoose
    const { mongooseConnectionString } = require("../config.json");
    if (!mongooseConnectionString) return;

    mongoose
        .connect(mongooseConnectionString)
        .then(() => console.log("Connected to mongodb"));



        //err

        const errch = "918113813897834516"

        process.on('unhandledRejection', (reason, p) => {
    
            console.log(" [Anti-Crash] => unhandled Rejection/Catch")
            console.log(reason, p)
    
            const embed = new Discord.MessageEmbed()
            .setColor('DARK_RED')
            .setTitle("⚠ New error❗")
            .setDescription('**An error just occured in bot console!**\n\nERROR\n ```' + reason + "\n\n" + p + "```")
            .setTimestamp()
            .setFooter("Anti-Crash System")
    
            client.channels.cache.get(errch).send({ embeds: [embed] });
    
    
        })
        
        process.on('uncaughtException', (reason, origin) => {
    
            console.log(" [Anti-Crash] => unhandled Exception/Catch")
            console.log(reason, origin)
            
            const embed = new Discord.MessageEmbed()
            .setColor('DARK_RED')
            .setTitle("⚠ New error❗")
            .setDescription('**An error just occured in bot console!**\n\nERROR\n ```' + reason + "\n\n" + origin + "```")
            .setTimestamp()
            .setFooter("Anti-Crash System")
    
            client.channels.cache.get(errch).send({ embeds: [embed] });
    
    
        })
    
        process.on('uncaughtExceptionMonitor', (reason, origin) => {
    
            console.log(" [Anti-Crash] => unhandled Exception/Catch")
            console.log(reason, origin)
    
            const embed = new Discord.MessageEmbed()
            .setColor('DARK_RED')
            .setTitle("⚠ New error❗")
            .setDescription('**An error just occured in bot console!**\n\nERROR\n ```' + reason + "\n\n" + origin + "```")
            .setTimestamp()
            .setFooter("Anti-Crash System")
    
            client.channels.cache.get(errch).send({ embeds: [embed] });
    
    
        })
    
        process.on('multipleResolves', (type, promise, reason) => {
    
            console.log(" [Anti-Crash] => Multiple Resolves")
            console.log(type, promise, reason)
    
            const embed = new Discord.MessageEmbed()
            .setColor('DARK_RED')
            .setTitle("⚠ New error❗")
            .setDescription('**An error just occured in bot console!**\n\nERROR\n ```' + type + "\n\n" + promise + "\n\n" + reason + "```")
            .setTimestamp()
            .setFooter("Anti-Crash System")
    
            client.channels.cache.get(errch).send({ embeds: [embed] });
    
    
        })
};
