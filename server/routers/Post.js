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
        let sqlCommand = `SELECT * FROM courses , files 
        WHERE course_name ILIKE '%${searchString}%' 
        OR course_id ILIKE '%${searchString}%'
        AND files.id = courses.course_logo;`

        const {rows} = await con.query(sqlCommand);
        let courses = rows.map(course=>{
            if (course.course_logo){
                course.data = Buffer.from(course.data).toString('base64')
                return course;
            }
            else{
                return course
            }
            
        })
        con.release();
        return res.status(200).json({courses:rows})
    } catch (error) {
        console.log(error)
    }
})


export default post;