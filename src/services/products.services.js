export default class ProductsServices{
    constructor(dao){
        this.dao = dao;
    }

    getAllProductsPaginated = async(limit, page, sort, category, tipo, maxPrice, minPrice) =>{
        return this.dao.getAllProductsPaginated(limit, page, sort, category, tipo, maxPrice, minPrice)
    }

    getProductById = async(id) => {
        return this.dao.getProductById(id)
    }

    addProoducts = async(data) => {
        return this.dao.addProoducts(data)
    }

    getProducts = async() => {
        return this.dao.getProducts()
    }
}