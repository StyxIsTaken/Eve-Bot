import userSchema from '../../schemas/userSchema'

export default async function msgCounterFunc(msgCounter: Number, memberId: string){
  
  await userSchema.findOneAndUpdate({userID: memberId}, {$inc: {messages: 1, msgCounter: 1}}, {upsert: true, new: true})

  if(msgCounter >= 10){
    await userSchema.findOneAndUpdate({userID: memberId}, {$inc: {coinage: 5}}, {upsert: true, new: true})
    await userSchema.findOneAndUpdate({userID: memberId}, {msgCounter: 0}, {upsert: true, new: true})
    return;
  }

}