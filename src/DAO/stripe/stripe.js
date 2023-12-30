import Stripe from "stripe"
import 'dotenv/config.js'
import CartsModel from '../models/carts.model.js'
const stripe = new Stripe(process.env.PRIVATE_KEY_STRIPE)

export default class StripeClass{
    contructor(){}

buildUrl = (path) => {
  if (process.env.NODE_ENV != 'production') {
    
    return `http://localhost:8080${path}`;
  } else {
    return `https://programacionbackend-production-a757.up.railway.app${path}`;
  }
}


  StripePayment = async (cartId) => {
    
    const cart = await CartsModel.findById(cartId).populate("products.pid")

    const lineItems = cart.products.map((producto) => ({
        price_data: {
          currency: 'ars',
          product_data: {
            name: producto.pid.name,
            description: producto.pid.description,
          },
          unit_amount: Math.round(producto.pid.price.toFixed(2) * 100),
        },
        quantity: producto.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: this.buildUrl('/'),
        cancel_url: this.buildUrl('/error')
    });

    return session;
  }


}