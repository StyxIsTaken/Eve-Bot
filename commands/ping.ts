import { ICommand } from 'wokcommands'

export default {
  name: 'ping',
  category: 'Testing',
  description: 'Replies with pong', // Required for slash commands
  
  slash: true, // Create both a slash and legacy command
  testOnly: false, // Only register a slash command for the testing guilds
  
  callback: ({ message, interaction, client }) => {
    // interaction is provided for slash commands
    interaction.reply(`🏓Latency is **${Date.now() - interaction.createdTimestamp}ms.** API Latency is ${Math.round(client.ws.ping)}ms`);
  },
} as ICommand

