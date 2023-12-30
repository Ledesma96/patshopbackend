import mongoose from "mongoose";

const ordersCollection = 'orders';

const oredersSchema = new mongoose.Schema({
    buyer: String,
    email: String,
    products:[{
        pid:{
            type: mongoose.Schema.ObjectId,
            ref: "products",
        },
        quantity: Number
    }],
    amount: Number,
    purchase_dateTime: Date,
    code: Number
})

const OrdersModel = mongoose.model(ordersCollection, oredersSchema)

export default OrdersModel