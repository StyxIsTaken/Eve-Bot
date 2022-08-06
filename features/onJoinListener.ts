import { Client, TextChannel } from 'discord.js'
import WOKCommands from 'wokcommands'
import userSchema from '../schemas/userSchema'

export default (client: Client, instance: WOKCommands) => {
  // Listen for new members joining guild
  client.on('guildMemberAdd', async (member) => {
    // Access the guild joined
    const { guild } = member
    const memberId = member.id

    const channel = guild.channels.cache.find((channel) => channel.name === 'general') as TextChannel
      if(!channel){
        return
      }
    
    channel.send({content: `Welcome to CoderOasis's Discord server, ${member} Please take a look at the <#1005020844755517530> channel for more information about us, and the <#1005020844755517530> for getting roles that you are interested in about.`,})

    setTimeout(async () => {
      await new userSchema({
        userID: memberId,
        exp: 1,
        level: 1,
        messages: 0,
        msgCounter: 0
      }).save()
    }, 5000)

  })
}