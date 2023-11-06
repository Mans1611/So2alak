import { Router } from "express";
import client from "../databse.js";



const post = Router();
/* 
1 - middleware for authntication 
*/

post.get('/searchcourse/:searchString',async(req,res)=>{
    let {searchString} = req.params;
    try {
        const con = await client.connect();
        let sqlCommand = `SELECT * FROM courses 
        WHERE course_name ILIKE '%${searchString}%' 
        OR course_id ILIKE '%${searchString}%';`
        const {rows} = await con.query(sqlCommand);
        con.release();
        return res.status(200).json({courses:rows})
    } catch (error) {
        con.release();
        console.log(error)
    }
})


export default post;