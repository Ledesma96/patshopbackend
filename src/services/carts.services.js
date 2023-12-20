export default class CartsRepository {
    constructor(dao) {
        this.dao = dao
    }
    
    getCartsById = async(id) => {
        return this.dao.getCartsById(id)
    }

    createCart = async() => {
        return this.dao.createCart()
    }

    addProductToCart = async(cid, pid, quantity) => {
        return this.dao.addProductToCart(cid, pid, quantity)
    }

    updatedeCart = async(cid, pid, quantity) => {
        return this.dao.updatedeCart(cid, pid, quantity)
    }
}