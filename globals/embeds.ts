import { MessageEmbed, Role, TextChannel, Client, Channel } from 'discord.js'
import { client } from '../index'


export async function modWarnEmbed(mentionedUser: any, moderator: string, reason: string) {
    
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

    setTimeout( () => {
        (client.channels.cache.get('991248530339545188') as TextChannel ).send({embeds: [warnLogEmbed]})
        }, 3000);
}


export function ciBanEmbed(mentionedUser: any, reasoning: string) {
    
    const ciBanEmbed = new MessageEmbed()
          .setColor('RED')
          .setTitle('__**MOD: User Banned!**__')
          .setThumbnail('https://i.imgur.com/M88Y1PO.jpeg')
          .setDescription(`**${mentionedUser} Banned!**`)
          .addFields(
            {name: `User Banned:`, value: `${mentionedUser}`, inline: true},
            {name: `By Moderator:`, value: `<@998206783866798162>`, inline: true},
            {name: `Reason:`, value:`${reasoning}`, inline: true}
          );

          setTimeout( () => {
            (client.channels.cache.get('991248530339545188') as TextChannel ).send({embeds: [ciBanEmbed]})
          }, 3000);
}
