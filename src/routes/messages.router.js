import { Router } from "express";
import { getMessageById, getMessages, sendMessage } from "../controllers/messages.controllers.js";

const router = new Router();

router.get('/', getMessages)
router.get('/:id', getMessageById)

router.post('/send-message', sendMessage)

export default router