import { ordersService } from "../services/index.js"

export const getOders = async(req, res) => {
    try {
        const orders = await ordersService.getOrders()
        res.status(200).send({success: true, message: 'Get all orders successfully', orders: orders})
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}

export const getOrderById = async(req, res) => {
    try {
        const order = await ordersService.getOrderById(req.params.id)
        res.status(200).send({success: true, message:'get order successfully', order: order})
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}

export const generateOrder = async(req, res) => {
    try {
        const id = req.params.id
        const name = req.body.name
        const email = req.body.email
        const order = await ordersService.generateOrder(id, name, email)
        res.status(200).send({success: true, message: order})
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}