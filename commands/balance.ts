import { ICommand } from 'wokcommands'
import mongoose from 'mongoose';
import userSchema from '../schemas/userSchema';
import { MessageEmbed } from 'discord.js';

export default {
  name: 'level',  
  category: 'Testing',
  description: 'Setup a Eve Profile', // Required for slash commands
  ephimeral: true,
  
  slash: false, // Create both a slash and legacy command
  testOnly: false, // Only register a slash command for the testing guilds
  
  callback: async ({ message}) => {
  },
} as ICommand


