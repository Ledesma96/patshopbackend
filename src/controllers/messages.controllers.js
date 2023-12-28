import {messagesService} from '../services/index.js'

export const getMessages = async(req,res) => {
    try {
        const messages = await messagesService.getMessages()
        res.status(201).send({success: true, messages: messages})
    } catch (error) {
        res.status(500).send({success:false, message: error.message})
    }
}

export const getMessageById = async(req, res) => {
    try {
        const id = req.params.id

        const message = await messagesService.getMessageById(id)

        res.status(200).send({success: true, message: message})
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}

export const sendMessage = async (req, res) => {
    const data = {
        name: req.body.name,
        telephone: req.body.telephone,
        email: req.body.email,
        message: req.body.message,
        date: req.body.date
    }

    try {
        const message = await messagesService.sendMessage(data)
        res.status(200).send({success: true, message: 'Sent message successfully', message: message})
    } catch (error) {
        res.status(500).send({success: false, message:error.message})
    }
}