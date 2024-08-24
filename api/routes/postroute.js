import express from "express"
import { verifyToken } from "../middleware/verifytoken.js";
import { addPost, deletePost, getpost, getPosts, updatePost } from "../controllers/postcontroller.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getpost);
router.post("/",verifyToken, addPost);
router.put("/:id",verifyToken, updatePost);
router.delete("/:id",verifyToken, deletePost);



export default router;

