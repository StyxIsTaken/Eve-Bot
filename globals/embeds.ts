import { MessageEmbed, Role, TextChannel, Client, Channel } from 'discord.js'
import { client } from '../index'


export default async function modWarnEmbed(mentionedUser: any, moderator: string, reason: string) {
    
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