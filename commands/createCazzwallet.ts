import { ICommand } from 'wokcommands'
import mongoose from 'mongoose';
import userSchema from '../schemas/userSchema';
import { MessageEmbed } from 'discord.js';

export default {
  name: 'setup',  
  category: 'Testing',
  globalCooldown: '365d',
  description: 'Setup a Cazz Coin profile!', // Required for slash commands
  ephimeral: true,
  
  slash: false, // Create both a slash and legacy command
  testOnly: false, // Only register a slash command for the testing guilds
  
  callback: async ({ message}) => {

    const  authorID = message.author.id;
    const cazzProfile = await userSchema.findOne({
        userID: authorID
    })

    if(await userSchema.findOne({userID: authorID})){
      console.log('user already exist!');
      message.reply(`You already have a profile setup for Cazz Coin! \n
      With a balance of ${cazzProfile?.cazzCoin}`);
      return;
    }else{
        
        //add user to mongo        
        await new userSchema({
          userID: authorID,
            cazzCoin: 1,
          infractions: 0
        }).save()
          

          const cazzProfEmbed = new MessageEmbed()
            .setColor('#4278f5')
            .setTitle('__**Bank of Cazz**__')
            .setThumbnail('https://i.imgur.com/M88Y1PO.jpeg')
            .setDescription(`**Setup successful!**`)
            .addField(`\u200b`, `\u200b`)
            .addField(`💰 Current Balance`, `${cazzProfile?.cazzCoin}`)

            message.channel.send({embeds: [cazzProfEmbed]});
    }

    


  },
} as ICommand


