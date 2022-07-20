import { ICommand } from 'wokcommands'
import mongoose from 'mongoose';
import userSchema from '../schemas/userSchema';
import { MessageEmbed } from 'discord.js';

export default {
  name: 'bal',  
  category: 'Testing',
  description: 'Setup a Cazz Coin profile!', // Required for slash commands
  ephimeral: true,
  
  slash: false, // Create both a slash and legacy command
  testOnly: false, // Only register a slash command for the testing guilds
  
  callback: async ({ message}) => {

    const  authorID = message.author.id;
    
    const balUser = await userSchema.findOne({
        userID: authorID,
    })

    const balEmbed = new MessageEmbed()
    .setColor('#4278f5')
    .setTitle('__**Bank Of Cazz**__')
    .setThumbnail('https://i.imgur.com/M88Y1PO.jpeg')
    .setDescription(`**Wallet Balance**`)
    .addField(`\u200b`, `\u200b`)
    .addField(`💰 Current Balance`, `${balUser?.coinage} Cazz Coin(s)`, true)

    message.reply({embeds: [balEmbed]});
  },
} as ICommand


