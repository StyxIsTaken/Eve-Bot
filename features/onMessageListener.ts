import { Client, Message, MessageEmbed, MessageSelectMenu, TextChannel } from 'discord.js'

import WOKCommands from 'wokcommands'
import userSchema from '../schemas/userSchema'
import msgCounterFunc from '../globals/economy/msgCounterFunc'

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
    const eveProfile = await userSchema.findOne({
      userID: memberId
    })

    if(msg.author.bot)
      return;

    if(!eveProfile){
      
      setTimeout(async () => {
        await new userSchema({
          userID: memberId,
          coinage: 1,
          infractions: 0,
          messages: 1,
          msgCounter: 1
        }).save()
      }, 5000)
      
      return;
    }
     

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
          {name: `Infractions:`, value: `Current ${eveProfile?.infractions}`}
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
  msgCounterFunc(eveProfile.msgCounter, memberId)
  // Part 2 End
  }catch(err){
    console.log(err)
  }
  
  })  
}



