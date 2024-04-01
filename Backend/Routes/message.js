import express from "express";
import { protectRoute }  from "../middlewares/protectRoute.js";
const router = express.Router();
import {getMessages, sendMassage} from "../Controllers/messageController.js";
router.get("/:id",protectRoute,getMessages);

router.post("/send/:id",protectRoute,sendMassage);

export default router;