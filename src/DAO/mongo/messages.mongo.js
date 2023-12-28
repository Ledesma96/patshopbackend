import MessagesModel from "./models/messages.model.js"

export default class MessagesMongo{
    constructor() {

    }

    getMessages = async() => {
        try {
            return await MessagesModel.find().sort({date: -1})
        } catch (error) {
            throw error
        }
    }

    getMessageById = async(id) => {
        try {
            const message = await MessagesModel.findById(id)
            return message
        } catch (error) {
            throw error
        }

    }

    sendMessage = async(data) => {
        try {
            console.log(data);
            const newMessage = new MessagesModel(data)
            console.log(newMessage);
            await newMessage.save()

            return ('Message sent succesfully')
        } catch (error) {
            throw error
        }
    }
}