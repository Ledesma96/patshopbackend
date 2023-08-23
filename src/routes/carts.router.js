import { Router } from "express";
import CartsModel from "../DAO/models/carts.model.js";
import ProductsModel from "../DAO/models/products.model.js";

const router = Router();

router.get("/:cid", async(req,res) => {
    const {cid} = req.params;
    
    try {
        const cart = await CartsModel.findOne({_id: cid}).populate("products.pid")
        res.status(201).send(cart)
    } catch (error) {
        res.status(400).send("Error al obtener el carrito")
    }
})

router.post("/", async (req, res) => {
    try {
        const newCart = await new CartsModel({products:[]}).save()
        console.log(newCart);
        res.status(201).send(newCart)
        
    } catch (error) {
        res.status(401).send({error: "Error al crear un carrito" + error})
        console.log(error);
    }
})

router.post("/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = parseInt((req.body.quantity || 1))
    const cart = await CartsModel.findById(cid)

    try {
        const product = await ProductsModel.findById(pid)
        if(cart){
            if(product){
                const existProduct = cart.products.find((item) => item.pid.toString() === pid)
                if(existProduct){
                    existProduct.quantity += quantity;
                    await cart.save();
                    res.status(201).send({message: "Cantidad actualizada"})
                } else {
                    cart.products.push({pid, quantity})
                    await cart.save();
                    res.status(201).send({message: "Producto agregado con exito"})
                }
            } else {
                res.status(400).send({message: "Este producto no existe en la base de datos"})
            }
        } else {
            res.status(401).send({mesasge: "El carrito no existe, por favor inicie sesion para obtener un carrito de compras"})
        }
    } catch (error) {
        res.status(404).send({message:"Error al obtener el carrito"})
    }
})

export default router;