import { Router } from "express";
import { createComment, getComments } from "../controllers/comment.controllers.js";


const router = new Router();

router.get('/', getComments)

router.post('/', createComment)

export default router