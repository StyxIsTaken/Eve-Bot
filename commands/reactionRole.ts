import { ICommand } from 'wokcommands'
import roleMessageSchema from '../schemas/roleMessageSchema'
import { Client, EmojiIdentifierResolvable, GuildMember, Interaction, MessageActionRow, MessageButton, MessageButtonStyleResolvable, Role, RoleData, TextChannel } from 'discord.js'

const buttonStyles = ['primary', 'secondary', 'success', 'danger']
const prefix = 'button-roles-'

export default {
  category: 'Testing',
  description: 'use once', // Required for slash commands
  permissions: ['ADMINISTRATOR'],
  minArgs: 4,
  expectedArgs: '<role> <emoji> <button-style> <button-labels>',
  expectedArgsTypes: ['ROLE', 'STRING', 'STRING', 'STRING'],
  slash: 'both', // Create both a slash and legacy command
  testOnly: false, // Only register a slash command for the testing guilds
  options: [
    {
        name: 'role', 
        description:'role to add to user',
        type: 'ROLE',
        required: true,
    },
    {
        name: 'emoji',
        description: 'emoji used for button',
        type: 'STRING',
        required: true,
    },
    {
        name: 'button-style',
        description: 'style used for button',
        type: 'STRING',
        required: true,
        choices: buttonStyles.map((style) => ({
            name: style,
            value: style.toUpperCase(),
        })),
    },
    {
        name: 'button-label',
        description: 'label used for button',
        type: 'STRING',
        required: true,
    },
  ],

  init: (client: Client) => {
    client.on('interactionCreate', (interaction) => {
        if(!interaction.isButton()){
            return
        }

        const {guild, customId} = interaction
        if(!guild || !customId.startsWith(prefix)){
            return
        }
        
        const roleId = customId.replace(prefix, '')
        const member = interaction.member as GuildMember

        if(member.roles.cache.has(roleId)){
            return
        }
        member.roles.add(roleId)
    })
  },

  callback: async ({guild, message, interaction, args }) => {
    args.shift()

    let role: Role
    if(message){
        role = message.mentions.roles.first() as Role
    }else{
        role = interaction.options.getRole('role') as Role
    }

    const emoji = args.shift()

    const buttonStyle = args.shift() || 'primary'
    if(!buttonStyle.includes(buttonStyle.toLocaleLowerCase())){
        return `invalid ButtonStyle`
    }

    const buttonLabel = args.join(' ')

    const data = await roleMessageSchema.findById(guild!.id)
    if(!data){
        return {
            custom: true,
            ephemeral: true,
            content: ` no role message found use /role`,
        }
    }

    const {channelId, messageId} = data
    const channel = guild!.channels.cache.get(channelId) as TextChannel
    const roleMessage = await channel.messages.fetch(messageId)

    const rows = roleMessage.components
    const button = new MessageButton()
        .setLabel(buttonLabel)
        .setEmoji(emoji as EmojiIdentifierResolvable)
        .setStyle(buttonStyle as MessageButtonStyleResolvable)
        .setCustomId(`${prefix}${role.id}`)
    let added = false

    for(const row of rows){
        if(row.components.length < 5){
            row.addComponents(button)
            added = true
            break
        }
    }

    if(!added){
        if(rows.length >= 10){
            return {
                custom: true,
                ephemeral: true,
                constent: `Cannot add more buttons`
            }
        }
        
        rows.push(new MessageActionRow().addComponents(button))
    }

    roleMessage.edit({
        components: rows,
    })
    
    return{
        custom: true,
        ephemeral: true,
        content: `added button`
    }
  },
} as ICommand

