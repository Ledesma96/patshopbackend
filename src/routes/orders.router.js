import { Router } from "express";
import { generateOrder, getOders, getOrderById } from "../controllers/orders.controllers.js";

const router = new Router();

router.get('/', getOders)
router.get('/:id', getOrderById)

router.post('/generated-order/:id', generateOrder)

export default router