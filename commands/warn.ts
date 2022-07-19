import { MessageActionRow, MessageEmbed, Role, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'
import userSchema from '../schemas/userSchema'

export default {
  name: 'warn',
  category: 'Moderation',
  description: 'Warns a user adding an infraction',
  slash: false,
  guildOnly: true,  

  expectedArgs: '<mentUser> [reason]',
  minArgs: 2,
  maxArgs: 5,
  permissions: ['ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS', 'VIEW_AUDIT_LOG'],
  
  callback: async ({ message, channel, args, client, guild, member }) => {
    const mentionedUser = message.mentions.users.first();
    const moderator = message.author.id;
    const mentionedUserArg = args[1]

    if(!mentionedUser){
        message.reply('no user targeted')
        return
    }

    if(mentionedUser)

    args.shift()
    const reason = args.join(' ')

    const warnEmbed = new MessageEmbed()
    .setColor('RED')
    .setAuthor({name: `${mentionedUser.tag} has been warned!`, iconURL: `${mentionedUser.displayAvatarURL()}`})
    .addFields(
        {name: `Reason:`, value:`${reason}`, inline: true}
    );



    const warnLogEmbed = new MessageEmbed()
    .setColor('RED')
    .setTitle('__**MOD: User warned**__')
    .setThumbnail('https://i.imgur.com/M88Y1PO.jpeg')
    .setDescription(`**Infraction added for user ${mentionedUser}**`)
    .addFields(
        {name: `User Warned:`, value: `${mentionedUser}`, inline: true},
        {name: `By Moderator:`, value: `<@${moderator}>`, inline: true},
        {name: `Reason:`, value:`${reason}`, inline: true}
    )
    .setFooter({text: 'TEST FOR NOW'});

    message.channel.send({embeds: [warnEmbed]})
    
    setTimeout( () => {
        (client.channels.cache.get('991248530339545188') as TextChannel ).send({embeds: [warnLogEmbed]})
      }, 3000);

    
    await userSchema.findOneAndUpdate({userID: mentionedUser},{$inc: {infractions: +1}},{upsert: true,new: true});

    //const checkMentUser = await userSchema.findOne({userID: mentionedUser, infractions: {$gt: 10}})
    
    console.log('work')
},
} as ICommand