import { cartsServices } from "../services/index.js";

export const getCartsById = async (req, res) => {
    try {
        const {cid} = req.params;
        const cart = await cartsServices.getCartsById(cid)
        res.status(201).send({success: true, cart: cart})
    } catch (error) {
        res.status(400).send({success: false, error: error.message})
    }
}

export const createCart = async (req, res) => {
    try {
        const newCart = await cartsServices.createCart()
        res.status(200).send({success: true, cart: newCart})
    } catch (error) {
        res.status(500).send({success: false, message: error.message})   
    }
}

export const addProductToCart = async(req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity;
        const add = await cartsServices.addProductToCart(cid, pid, quantity)

        res.status(201).send({success: true, message: add})
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}

export const updateCart = async (req, res) => {
    try {
        const {cid, pid} = req.params;
        const {quantity} = req.body;

        const add = await cartsServices.updatedeCart(cid, pid, quantity)

        res.status(201).send({success: true, message: add})
    } catch (error) {
        res.status(400).send({succes: false, message:'An unexpected error occurred', error: error.message})
    }
}

export const deleteAproduct = async (req, res) => {
    try {
        const {cid, pid} = req.params

        const deleted = await cartsServices.deleteAproduct(cid, pid)
        res.status(202).send({success: true, message: deleted})
    } catch (error) {
        res.status(400).send({success: false, message: error.message})
    }
}