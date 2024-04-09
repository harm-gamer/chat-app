import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import authRoutes from "./Routes/authverify.js"
import messageRoute from "./Routes/message.js"
import cookieParser from 'cookie-parser';
import userRouter from "./Routes/user.js";
import {app,server} from "./socket/socket.js";
import path from "path"
import cors from 'cors';

app.use(cors({
    sameSite : false,
}));

dotenv.config();

const __dirname = path.resolve();
const ATLAS = process.env.ATLAS_DB;

 export async function main(){
    await mongoose.connect(ATLAS);
 }

 main().then((res) => {console.log("connected to db")});

 app.use(express.json());
 app.use(cookieParser());
app.use("/api/auth",authRoutes);


app.use("/api/message",messageRoute);
app.use("/api/user",userRouter);
const PORT = process.env.PORT || 8000;
app.use(express.json());
server.listen(PORT,()=>{
    console.log(`server started to listing post ${PORT}`);
})