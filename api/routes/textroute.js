import express from "express"
import { handleShouldbeAdmin, handleShouldbeLoggedin } from "../controllers/testcontroller.js";
import { verifyToken } from "../middleware/verifytoken.js";
const router = express.Router();


router.get("/should-be-loggedin",verifyToken, handleShouldbeLoggedin);
router.get("/should-be-admin", handleShouldbeAdmin);

export default router;