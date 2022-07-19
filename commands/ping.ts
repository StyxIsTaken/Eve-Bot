import { ICommand } from 'wokcommands'

export default {
  name: 'ping',
  category: 'Testing',
  description: 'Replies with pong', // Required for slash commands
  
  slash: true, // Create both a slash and legacy command
  testOnly: false, // Only register a slash command for the testing guilds
  
  callback: ({ message, interaction }) => {
    // interaction is provided for slash commands
    interaction.reply(`pong`);
  },
} as ICommand





/*
let msgInterval = 0;
client.on('messageCreate', async (msg) =>{

const memberId = msg.author.id;

await userSchema.findOneAndUpdate({
  userID: memberId,
  $inc: {
    cazzCoin: 5
  }
},
{
  new: true
}
);
  
if(msg){
  msgInterval++;
}
  

console.log(msgInterval)
if(msgInterval >= 10){

await userSchema.findOneAndUpdate({
  userID: memberId,
  $inc: {
    cazzCoin: 5
  }
},
{
  new: true
}
);

msgInterval = 0;

return;
}

});
*/