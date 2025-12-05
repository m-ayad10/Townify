import express, { type Request, type Response } from "express";

const app = express();

app.get('/',(req:Request,res:Response)=>{
    res.send("Server Running at 8081");
})

app.listen(8081,()=>{
    console.log("Server Listinig at 8081");
})