import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productColletion = "products"
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    image: String,
    stock: Number,
    code: Number,
    description:{
        type: String,
        require: true
    },
    status:{
        type: Boolean,
        default: true
    },
    category:{
        type: String,
        enum:["peces", "aves", "gatos", "perros", "conejos", "roedores"],
        default:"gatos"
    },
    tipo: String
})

productSchema.plugin(mongoosePaginate)

const ProductsModel = mongoose.model(productColletion, productSchema)

export default ProductsModel