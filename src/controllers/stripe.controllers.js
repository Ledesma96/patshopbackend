import { stripeServices } from "../services/index.js"

export const StripePayment = async(req, res) => {
    const cartId = req.params.id
    console.log(cartId);

    const session = await stripeServices.StripePayment(cartId)
    return res.json(session);
}