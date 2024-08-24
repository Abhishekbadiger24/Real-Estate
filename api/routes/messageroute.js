import express from "express";
import { addMessage, getMessages } from "../controllers/messagecontroller.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();



router.get("/",  verifyToken, getMessages)
// router.get("/:id",verifyToken, getChat)
router.post("/:chatId",verifyToken,  addMessage)
// router.put("/read/:id", verifyToken, readChat)


export default router;