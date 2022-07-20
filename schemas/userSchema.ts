import {Schema, model } from "mongoose";

interface IUser{
    userID: string;
    coinage?: Number;
    infractions?: Number;
    messages?: Number;
    msgCounter: Number;
}


const userSchema = new Schema<IUser>({
    userID: {
        type: String,
        required: true
    },
    coinage:{
        type: Number,
        required: false
    },
    infractions:{
        type: Number,
        required: true,
        default: 0
    },
    messages: {
        type: Number,
        required: false
    },
    msgCounter: {
        type: Number,
        required: true,
        default: 0
    }

})

const userModel = model<IUser>('user', userSchema);

export default userModel