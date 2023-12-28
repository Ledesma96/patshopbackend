export default class MessagesServices{
    constructor(dao){
        this.dao = dao;
    }

    getMessages = async() => {
        return this.dao.getMessages();
    }

    getMessagesById = async(id) => {
        return this.dao.getMessagesById(id);
    }

    sendMessage = async(data) => {
        return this.dao.sendMessage(data)
    }
}