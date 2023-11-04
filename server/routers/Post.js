import { Router } from "express";
import client from "../databse.js";



const post = Router();
/* 
1 - middleware for authntication 
2 - Check letter case sensitivity

*/

post.get('/searchcourse/:searchString',async(req,res)=>{
    let {searchString} = req.params;
    try {
        const con = await client.connect();
        let sqlCommand = `SELECT * FROM courses 
        WHERE course_name LIKE '%${searchString}%' 
        OR course_id LIKE '%${searchString}%';`
        const {rows} = await con.query(sqlCommand);
        return res.status(200).json({courses:rows})
    } catch (error) {
        console.log(error)
    }
    finally{
        con.release();
    }
})


export default post;