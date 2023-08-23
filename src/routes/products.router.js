import { Router } from "express";
import ProductsModel from "../DAO/models/products.model.js";

const router = Router();

router.get("/", async (req, res) => {
    const limit = parseInt(req.query?.limit || 6);
    const page = parseInt(req.query?.page || 1);
    const sort = parseInt(req.query?.sort || 1)
    const category = req.query?.category || null;
    const tipo = req.query?.tipo || null
    const maxPrice = parseInt(req.query?.max || 100000000)
    const minPrice = parseInt(req.query?.min || 0)

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
      res.status(201).send(products)
})

router.get("/detail/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const product = await ProductsModel.findById(id);
        res.status(201).send(product)
    } catch (error) {
        res.status(401).send("Ha ocurrido un error inesperado", error)
    }
})


router.post("/add-products", async(req, res) => {
    const data = req.body

    try {
        const product = await ProductsModel.find({code: data.code})
        console.log(product.length);

        if (product.length == 0){
            const newProduct = new ProductsModel(data)
            await newProduct.save()
            res.status(201).send("Producto cargado con exito")
        } else {
            console.log("Este producto ya existe");
            res.send("Exte producto ya existe")
        }
        
    } catch (error) {
        console.log("Error al cargar un producto", error);
        res.status(401).send({"error": error})
    }
})


export default router