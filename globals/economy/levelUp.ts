import userSchema from '../../schemas/userSchema'

export default async function levelUpFunc(exp: Number, memberId: string){
  
    if(exp >= 100){
      await userSchema.findOneAndUpdate({userID: memberId}, {$inc: {level: 1}}, {upsert: true, new: true})
      await userSchema.findOneAndUpdate({userID: memberId}, {exp: 0}, {upsert: true, new: true})
      return;
    }
  
  }