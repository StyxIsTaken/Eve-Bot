import { Client, TextChannel } from 'discord.js'
import WOKCommands from 'wokcommands'
import userSchema from '../schemas/userSchema'

export default (client: Client, instance: WOKCommands) => {
  // Listen for new members joining guild
  client.on('guildMemberAdd', async (member) => {
    // Access the guild joined
    const { guild } = member
    const memberId = member.id

    setTimeout(async () => {
      await new userSchema({
        userID: memberId,
        coinage: 1,
        infractions: 0,
        messages: 0,
        msgCounter: 0
      }).save()
    }, 5000)
  })
}