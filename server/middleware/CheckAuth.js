import express from "express";
import jwt from "jsonwebtoken";
export const CheckAuth = (req,res,next)=>{
    try{
        const{token} = req.headers;
        const payload = jwt.verify(token,process.env.JWTPASS);
        next(); 
    }catch(err){
        console.log(err)
    }
} 