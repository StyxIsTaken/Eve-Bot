import {Schema, model } from "mongoose";

const reqString = {
    type: String,
    required: true, 
}

interface Irole{
    _id: any;
    channelId: string;
    messageId: string;
}


const roleMessageSchema = new Schema<Irole>({
    _id: reqString,
    channelId: reqString,
    messageId: reqString,
})

const roleModel = model<Irole>('role', roleMessageSchema);

export default roleModel