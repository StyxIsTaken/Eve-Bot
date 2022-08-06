import {Schema, model } from "mongoose";

interface IUser{
    userID: string;
    exp: Number;
    level: Number;
    messages: Number;
    msgCounter: Number;
}


const userSchema = new Schema<IUser>({
    userID: {
        type: String,
        required: true
    },
    exp:{
        type: Number,
        required: false
    },
    level:{
        type: Number,
        required: true
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