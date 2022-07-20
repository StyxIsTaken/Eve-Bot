import { MessageEmbed, Role, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'
import userSchema from '../schemas/userSchema'
import {modWarnEmbed, ciBanEmbed} from '../globals/embeds'

export default {
  name: 'warn',
  category: 'Moderation',
  description: 'Warns a user adding an infraction',
  slash: false,
  guildOnly: true,  
  expectedArgs: '<mentUser> [reason]',
  expectedArgsTypes: ['USER', 'STRING'],
  minArgs: 2,
  maxArgs: 5,
  permissions: ['ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS', 'VIEW_AUDIT_LOG'],
  
    callback: async ({ message, channel, args, client, guild, member, interaction }) => {

      try{ 
           
      const mentionedUser = message.mentions.users.first()
      const moderator = message.author.id;
      const mentionedID = message.mentions.users.first()?.id;
      const mentionedUserArg = args[1]
      const eveProfile = await userSchema.findOne({userID: mentionedID})
      
      if(mentionedUser){
      
        args.shift()
        const reason = args.join(' ')
        const warnEmbed = new MessageEmbed()
        .setColor('RED')
        .setAuthor({name: `${mentionedUser.tag} has been warned!`, iconURL: `${mentionedUser.displayAvatarURL()}`})
        .addFields(
            {name: `Reason:`, value:`${reason}`, inline: true}
        );

        //Send the embed to channel warn was issued
        message.channel.send({embeds: [warnEmbed]})

        //Embed for mod Channel
        modWarnEmbed(mentionedUser, moderator, reason)

        await userSchema.findOneAndUpdate({userID: mentionedID}, {$inc: {infractions: 1}}, {upsert: true, new: true})

        //After 3 seconds send warnLogEmbed to mod channel
        

        const targetUser = message.guild?.members.cache.get(mentionedUser.id)
        
        const reasoning = 'User had too many infractions!'

        if(eveProfile)
        if(targetUser)
        if(eveProfile.infractions)
        
        if(eveProfile.infractions >= 3){
          
          ciBanEmbed(mentionedUser, reasoning)
          //ban mentioned user for too many infractions!
          targetUser.ban()
            return;
        }
      }

    }catch(err){
      console.log(err)
    }
  },
} as ICommand

