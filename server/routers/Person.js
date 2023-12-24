import { Router } from "express"
import client from "../databse.js";
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
import DefaultCourses from "../utilis/DefaultCourses.js";

dotenv.config();

const person = Router();
person.post('/signup',async(req,res)=>{
    const {username,
        student_id,
        password,
        studnet_level,
        student_department,
        student_subdepartment}=req.body;
    try{
        const conn = await client.connect(); // conecting with database
        let sqlCommand = `SELECT * FROM students WHERE student_id='${student_id}' OR studnet_name='${username}'`;
        let databaseResponse = await conn.query(sqlCommand);
        // check if this student_id has an account already or not.
        if(databaseResponse.rows.length > 0)
            return res.status(400).json({msg:"This id is already exists, try login"});

        const salt = await bcrypt.genSalt(parseInt(process.env.Salt));
        const hashedPass =  await bcrypt.hash(password,salt) // encrypting the password 
        sqlCommand = `INSERT INTO students (student_id,studnet_name,student_level,password,student_department,student_subDepartment) VALUES($1,$2,$3,$4,$5,$6)`;
        // I created person in the database.
        await conn.query(sqlCommand,[student_id,username,studnet_level,hashedPass,student_department,student_subdepartment]);
       
        const courses = await DefaultCourses(studnet_level,student_department,student_subdepartment);
        
        conn.release(); // release the connection with the database
        return res.status(200).json({sugesstedCourses : courses});
    }   
    catch(err){
        console.log(err);
    }
})

// for siging in 
person.post('/signin',async(req,res)=>{
    const {student_id,password} = req.body;
    try{
        const con = await client.connect();
        const sqlCommand = `SELECT * FROM students WHERE student_id='${student_id}';`;
        const {rows} = await con.query(sqlCommand); 
        if(rows.length === 0)
            return res.status(400).json({msg:"Invalid Id or password"});
            
        const checkPass = await bcrypt.compare(password,rows[0].password);
        if (!checkPass)
            return res.status(400).json({msg:"Invalid Email or password"});
       
        return res.status(200).json({msg:"Welcome"});
    }catch(err){
        console.log(err)
    }
})

person.post('/registercourse',async(req,res)=>{
    const {student_id,studentCourses} = req.body // studentCourses is an array of courses that the studnet choose to follow
    
    if(!student_id)
        return res.status(400).json({msg : 'No provided id'})
    
    try{
        // as I will insert many values in the table as he might register many courses.
        
        let sqlCommand = 
        `INSERT INTO students_courses (student_id,course_id)
         VALUES
            ${studentCourses.map(course=> `('${student_id}','${course.course_id}')`)};
        `
        const con = await client.connect();
        await con.query(sqlCommand);
        con.release();
        return res.status(201).json({msg:"Done"})
    }catch(err){
        console.log(err)
    }

})
export default person;