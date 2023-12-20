import { Router } from "express";
import { addProoducts, getAllProductsPaginated, getProductById, getProducts } from "../controllers/porducts.controllers.js";

const router = Router();

//get
router.get("/", getAllProductsPaginated)
router.get("/detail/:id", getProductById)
router.get("/all-products", getProducts)

//post
router.post("/add-products", addProoducts)


export default router