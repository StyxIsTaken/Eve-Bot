import DiscordJS, { Intents } from 'discord.js';
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()


const client = new DiscordJS.Client({
  intents: [
    DiscordJS.Intents.FLAGS.GUILD_MESSAGES,
    DiscordJS.Intents.FLAGS.GUILDS,
    DiscordJS.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    DiscordJS.Intents.FLAGS.GUILD_MEMBERS,
    DiscordJS.Intents.FLAGS.DIRECT_MESSAGES,
    DiscordJS.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
],
})

client.on('ready', async () => {
  new WOKCommands(client, {
    // The name of the local folder for your command files
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    showWarns: true,
    ignoreBots: true,
    dbOptions: {
        keepAlive: true
    },
    mongoUri: process.env.MONGO_URI,
    typeScript: true
  }).setDefaultPrefix('?')
})

client.login(process.env.TOKEN);
