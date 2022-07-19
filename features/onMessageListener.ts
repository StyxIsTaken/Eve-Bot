import { Client, Message, MessageEmbed, MessageSelectMenu, TextChannel } from 'discord.js'
import { MembershipStates } from 'discord.js/typings/enums'
import WOKCommands from 'wokcommands'
import userSchema from '../schemas/userSchema'
import Enmap from 'enmap'
import mongoose from 'mongoose'


export default (client: Client, instance: WOKCommands) => {
  // Listen for bad messages

  /*
  - First part of the listener is to moderate black listed words
    - It listens to every message event and determines is a word is part of bannedWords array
    - It then logs it a specific channel ID and warns the user
      - Adds infraction to db profile

  - The second part of the event listener awards cazz coins after a cooldown.
  */

  //let msgInterval = 0;
  
  client.on('messageCreate', async (msg) => {

    try{

    // Part 1 Start!
    const memberId = msg.author.id;
    const bannedWords = ["badword", "nogood"]; 
    const inputContent = msg.content.toLowerCase();
    const cazzProfile = await userSchema.findOne({
      userID: memberId
    })
    
    console.log(cazzProfile)

    if(!cazzProfile)
      return;

if (bannedWords.some(word => msg.content.toLowerCase().includes(word.toLowerCase()))) {
    
  await userSchema.findOneAndUpdate({userID: memberId},{$inc: {infractions: +1}},{upsert: true,new: true});
  
  const blockedEmbed = new MessageEmbed()
      .setColor('#4278f5')
      .setTitle('__**Mod: Message Blocked**__')
      .setThumbnail('https://i.imgur.com/M88Y1PO.jpeg')
      .setDescription(`**tinCazz blocked a message**`)
      .addFields(
          {name: `\u200b`, value: `\u200b`},
          {name: `User:`, value:`<@${memberId}>`},
          {name: `Message Blocked:`, value:`${inputContent}`},
          {name: `\u200b`, value: `\u200b`},
          {name: `Added:`, value: `1 Infraction to user`},
          {name: `Infractions:`, value: `Current ${cazzProfile?.infractions}`}
          )
      .setFooter({text: 'Test for now'});
      //delete the message
      msg.delete();

      //send embed to logs channel
      setTimeout( () => {
        (client.channels.cache.get('991248530339545188') as TextChannel ).send({embeds: [blockedEmbed]})
      }, 3000);
      return;
    // Part 1 End
    }

  // Part 2 Start

  myFunc(cazzProfile.msgCounter, memberId)

   

  }catch(err){
    console.log(err)
  }
  
  })  
}

async function myFunc(msgCounter: Number, memberId: string){
  
    await userSchema.findOneAndUpdate({userID: memberId}, {$inc: {messages: 1, msgCounter: 1}}, {upsert: true, new: true})

    if(msgCounter >= 10){
      await userSchema.findOneAndUpdate({userID: memberId}, {$inc: {cazzCoin: 5}}, {upsert: true, new: true})
      await userSchema.findOneAndUpdate({userID: memberId}, {msgCounter: 0}, {upsert: true, new: true})
      return;
    }

}

