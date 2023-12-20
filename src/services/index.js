import CartsMongo from "../DAO/mongo/cart.mongo.js";
import CartsRepository from "./carts.services.js";

import ProductsMongo from "../DAO/mongo/products.mongo.js";
import ProductsServices from "./products.services.js";

const cartsServices = new CartsRepository( new CartsMongo());
const productsService = new ProductsMongo(new ProductsServices());
export {cartsServices, productsService,}