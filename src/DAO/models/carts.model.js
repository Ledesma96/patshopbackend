import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    products:[{
        pid:{type:mongoose.Schema.Types.ObjectId, ref:"products"},
        quantity: Number
    }]
})

const CartsModel = mongoose.model(cartsCollection, cartsSchema)

export default CartsModel