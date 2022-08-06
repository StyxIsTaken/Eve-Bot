import { TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'
import roleMessageSchema from '../schemas/roleMessageSchema'

export default {
  name: 'role',
  category: 'Testing',
  description: 'use once', // Required for slash commands
  permissions: ['ADMINISTRATOR'],
  minArgs: 2,
  expectedArgs: '<channel>, <message>',
  expectedArgsTypes: ['CHANNEL', 'STRING'],
  slash: 'both', // Create both a slash and legacy command
  testOnly: false, // Only register a slash command for the testing guilds
  
  callback: async ({guild, message, interaction, args }) => {
    // interaction is provided for slash commands
    args.shift()

    const text = args.join()

    let channel: TextChannel

    if(message){
        channel = message.mentions.channels.first() as TextChannel
        return
    }
    
    channel = interaction.options.getChannel('channel') as TextChannel

    const sentMessage = await channel.send(text)

    await new roleMessageSchema({
        _id: guild!.id,
        channelId: channel.id,
        messageId: sentMessage.id,
    }).save

    if(interaction){
        return {
            custom: true,
            content: 'Message Sent',
            ephemeral: true,
        }
    } 

  },
} as ICommand

