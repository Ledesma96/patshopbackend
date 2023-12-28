import CartsModel from "./models/carts.model.js"
import OrdersModel from "./models/orders.model.js"
import ProductsModel from "./models/products.model.js"

export default class OrdersMongo{
    contructor(){

    }

    getOrders = async() => {
        try {
            return await OrdersModel.find()
        } catch (error) {
            throw error
        }
    }

    getOrderById = async(id) => {
        try {
            return await OrdersModel.findById(id).populate('products.pid')
        } catch (error) {
            throw error
        }
    }

     generateOrder = async(id, name, email) => {
        try {
            const cart = await CartsModel.findById(id)
            const order = new OrdersModel
            order.amount = 0
            
            for (let i = 0; i < cart.products.length; i++) {
                const actualProduct = cart.products[i]
                const product = await ProductsModel.findById(actualProduct.pid)

                if (product.stock < actualProduct.quantity && product.stock != 0){
                    actualProduct.quantity = product.stock
                    product.stock = 0
                    order.products.push({pid: product._id, quantity: actualProduct.quantity})
                    order.amount += product.price * product.stock
                } else if(product.stock != 0){
                    product.stock -= actualProduct.quantity
                    order.products.push({pid: product._id, quantity: actualProduct.quantity})
                    order.amount += actualProduct.quantity * product.price
                }
                
            }
            order.buyer = name
            order.email = email
            order.purchase_dateTime = new Date()
            console.log(order);
            await order.save()

            return 'order generated successfully'
        } catch (error) {
            throw error
        }
     }
}