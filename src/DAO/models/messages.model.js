import mongoose from "mongoose";

const messageCollection = 'messages';

const messageSchema = new mongoose.Schema({
    name: String,
    telephone: Number,
    email: String,
    message: String,
    date: Date
})

const MessagesModel = mongoose.model(messageCollection, messageSchema)

export default MessagesModel