import  express  from "express";
const router = express.Router();
import {SignUp,login,logout}  from "../Controllers/authControllers.js"
router.post("/signUp",SignUp);
router.post("/login" ,login);
router.post("/logout",logout);

export default router;