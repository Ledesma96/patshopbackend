import { productsService } from "../services/index.js";

export const getAllProductsPaginated = async(req, res) => {
    try {
        const limit = parseInt(req.query?.limit || 6);
        const page = parseInt(req.query?.page || 1);
        const sort = parseInt(req.query?.sort || 1)
        const category = req.query?.category || null;
        const tipo = req.query?.tipo || null
        const maxPrice = parseInt(req.query?.max || 100000000)
        const minPrice = parseInt(req.query?.min || 0)

        const products = await productsService.getAllProductsPaginated(limit, page, sort, category, tipo, maxPrice, minPrice)
        res.status(200).send({success: true, products: products})
    } catch (error) {
        res.stauts({success: false, message: 'An unexpected error occurred', error: error.message})
    }
}

export const getProductById = async(req, res) => {
    try {
        const {id} = req.params;
        const product = await productsService.getProductById(id)

        res.status(200).send({succes:true, message: 'Successfully obtained product', product: product})
    } catch (error) {
        res.status(500).send({succes:false, message: 'An unexpected error occurred', error: error.message})
    }
}

export const addProoducts = async(req, res) => {
    try {
        const data = req.body

        const add = await productsService.addProoducts(data)

        res.status(200).send({succes: true, message: add})
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}

export const getProducts = async(req, res) => {
    try {
        const products = await productsService.getProducts()

        res.status(200).send({success: true, message:'Successfully retrieved products', products: products})
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}