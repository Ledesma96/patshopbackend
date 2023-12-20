import { Router } from "express";
import { addProductToCart, createCart, getCartsById, updateCart } from "../controllers/carts.controllers.js";

const router = Router();

router.get("/:cid", getCartsById)

router.post("/", createCart)

router.post("/:cid/products/:pid", addProductToCart)

router.put("/:cid/:pid", updateCart)

export default router;