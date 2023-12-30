export default class StripeServices{
    constructor(dao){
        this.dao = dao
    }
    
    StripePayment   = async(cartId) => {
        return this.dao.StripePayment(cartId)
    }
}