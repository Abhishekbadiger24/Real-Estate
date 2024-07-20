import express from "express";
import {handleLogin,handleLogout,handleRegister} from "../controllers/authcontroller.js"
const router = express.Router();



router.post("/login", handleLogin)
router.post("/register", handleRegister)
router.post("/logout", handleLogout)

export default router;