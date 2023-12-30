import { Router } from "express";
import { StripePayment } from "../controllers/stripe.controllers.js";

const router = Router();

router.post('/payment/:id', StripePayment)

export default router;