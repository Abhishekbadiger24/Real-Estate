import express from "express";
import { deleteUser, getUser, getUsers, UpdateUser } from "../controllers/usercontroller.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();



router.get("/",  getUsers)
router.get("/:id",verifyToken, getUser)
router.put("/:id",verifyToken,  UpdateUser)
router.delete("/:id", verifyToken, deleteUser)


export default router;