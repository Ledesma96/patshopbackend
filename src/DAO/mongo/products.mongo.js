import ProductsModel from "./models/products.model.js";

export default class ProductsMongo{
    constructor () {

    }

    getProducts = async() => {
        try {
            const products = await ProductsModel.find()
            return products
        } catch (error) {
            throw error
        }
    }

    getAllProductsPaginated = async(limit, page, sort, category, tipo, maxPrice, minPrice) => {
        try {
            const filterPrice = {
                price:{
                    $gte: minPrice,
                    $lte: maxPrice
                }
            }
            
          
            const filterCategory = category ? { category } : {};
            const filterType = tipo  == "null" || tipo == null ? {} : { tipo: req.query.tipo };
        
            const filters = {
                ...filterCategory,
                ...filterType,
                ...filterPrice
              };
        
              
          
              const products = await ProductsModel.paginate(filters, {
                page,
                limit,
                sort:{price: sort},
                lean: true,
              })
              products.nextLink = products.hasNextPage ? `/?page=${products.nextPage}&limit=${limit}&sort=${sort}` : "";
              products.prevLink = products.hasPrevPage ? `/?page=${products.prevPage}&limit=${limit}&sort=${sort}` : "";
              products.nextPagee = products.hasNextPage ? `/?page=${products.nextPage}&limit=${limit}&sort=${sort}` : "";
              products.prevPagee = products.hasPrevPage ? `/?page=${products.prevPage}&limit=${limit}&sort=${sort}` : "";
              return products
        } catch (error) {
            throw error
        }
    }

    getProductById = async(id) => {
        try {
            const product = await ProductsModel.findById(id);
            return product
        } catch (error) {
            throw error
        }
    }
    addProoducts = async(data) => {
        try {
            const product = await ProductsModel.find({code: data.code})
    
            if (product.length == 0){
                const newProduct = new ProductsModel(data)
                await newProduct.save()
                return 'Product successfully added'
            } else {
                return 'This product already exists in the database.'
            }
            
        } catch (error) {
            throw error
        }
    }

}