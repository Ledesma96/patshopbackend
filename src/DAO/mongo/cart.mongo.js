import CartsModel from "./models/carts.model.js"
import ProductsModel from "./models/products.model.js";

export default class CartsMongo{
    constructor(){
    }

    getCartsById = async(id) => {
        try {
            const cart = await CartsModel.findOne({_id: id}).populate("products.pid");
            return cart
        } catch (error) {
            throw error
        }
    }

    createCart = async() => {
        try {
            const newCart = await new CartsModel({products:[]}).save()
            return newCart 
        } catch (error) {
            throw error
        }
    }

    addProductToCart = async (cid, pid, quantity) => {
        const quant = parseInt(quantity || 1);
        const cart = await CartsModel.findById(cid);
    
        try {
            const product = await ProductsModel.findById(pid);
            if (cart) {
                if (product) {
                    const existProduct = cart.products.find((item) => item.pid.toString() === pid);
                    if (existProduct) {
                        existProduct.quantity += quant;
                        if(existProduct.quantity > product.stock) {
                            existProduct.quantity = product.stock
                        }
                    } else {
                        cart.products.push({ pid, quantity: quant });
                    }
    
                    await cart.save();
                    return 'Product successfully updated/added';
                } else {
                    return 'This product is not available';
                }
            } else {
                return 'This cart is not available, please log in to get a cart';
            }
        } catch (error) {
            throw error;
        }
    };
    

    updatedeCart = async(cid, pid, quantity) => {
        const quant = parseInt(quantity)
        const cart = await CartsModel.findById(cid);
        const product = await ProductsModel.findById(pid)
        const products = cart.products.find((item) => item.pid == pid)
        try {
            if(cart){
                if(products.quantity >= product.stock){
                    products.quantity = product.stock;
                    await cart.save()
                }
                products.quantity += quant
                await cart.save()

                return 'Quantity update successful'
            } else {
                return 'This cart is not available, please log in to get a cart'
            }
        } catch (error) {
            throw error
        }
    }
}