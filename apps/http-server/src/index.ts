import express, { type Request, type Response } from "express";

const app = express();

app.get('/',(req:Request,res:Response)=>{
    res.send("Server Running at 8080");
})

app.listen(8080,()=>{
    console.log("Server Listining at 8080")
})