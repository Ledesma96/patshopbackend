export default class OrdersServices{
    constructor(dao){
        this.dao = dao;
    }

    getOders = async() => {
        return this.dao.getOders();
    }

    getOrdersById = async(id) => {
        return this.dao.getOrdersById(id);
    }

    generateOrder = async(id, name, email) => {
        return this.dao.generateOrder(id, name, email)
    }
}