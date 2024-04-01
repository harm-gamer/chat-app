import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import {getUsersSidebar }from "../Controllers/userController.js"
const router = express.Router();

router.get("/",protectRoute,getUsersSidebar);

export default router;