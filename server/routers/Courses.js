import multer from "multer";
import client from "../databse.js";
import { Router } from "express";

const course = Router();
const storage = multer.memoryStorage();
const uploader = multer({storage:storage})




course.post('/addcourse',uploader.single('image'),async(req,res)=>{
    // for adding course to the platform.
    const { originalname, mimetype, buffer} = req.file;
    const {course_name, course_id,course_department,course_level} = req.body;
    let sqlCommand = `INSERT INTO files (filename,mimtype,data) values ($1,$2,$3) RETURNING id;`
    try{
        const con = await client.connect();
        const {rows} = await con.query(sqlCommand,[originalname,mimetype,buffer])
        if(rows[0].id){
            sqlCommand = 
            `INSERT INTO courses(course_name,course_id,course_level,course_department,course_logo) VALUES ('${course_name}','${course_id}','${course_level}','${course_department}',${rows[0].id});`
        }
        else{
            sqlCommand = 
            `INSERT INTO courses(course_name,course_id,course_level,course_department) VALUES ('${course_name}','${course_id}','${course_level}','${course_department}');`
            }
            const result = await con.query(sqlCommand);
            con.release();
            return res.json({msg:"Done"})
    }catch(err){
        console.log(err)
    }
})
course.get('/getimage',async(req,res)=>{
    const sqlCommand = `select data from files;`
    const con = await client.connect();
    const {rows} =await  con.query(sqlCommand);
    return res.send(Buffer.from(rows[0].data).toString('base64'));
})

export default course;
