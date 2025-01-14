import express from "express";
import { addChat, getChat, getChats, readChat } from "../controllers/chatcontroller.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();



router.get("/",  verifyToken, getChats)
router.get("/:id",verifyToken, getChat)
router.post("/:id",verifyToken,  addChat)
router.put("/read/:id", verifyToken, readChat)


export default router;