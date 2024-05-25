import { Router } from "express";
import client from "../databse.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { SQLFilter } from "../utilis/SQLFilter.js";
const teacher = Router();



teacher.post('/signup',async(req,res)=>{
    const {username,id,password,title,department,subdepartment} = req.body;
    let sqlCommand;
    let con; 
    try{
        con = await client.connect();
        if (!password){ //  to check the if the password is provided or not.
            return res.status(400).json({msg:"Error no password is provided"});
        }
        const salt = await bcrypt.genSalt(parseInt(process.env.Salt));
        let hashedPassword = await bcrypt.hash(password,salt);
        sqlCommand = `INSERT INTO teachers (username,id,password,title,department,sub_department)
        VALUES('${username}','${id}','${hashedPassword}','${title}','${department}','${subdepartment}')`;
        await con.query(sqlCommand);
        con.release();
        const token = jwt.sign({
            username,
            id,
            isAdmin:false,
            isTeacher:true,
        },process.env.JWTPASS); 
        return res.status(201).json({data:{user_id:id,username,title,department,subdepartment},token});

    }catch(err){
        console.log(err);
        res.status(400).json({msg:"an error occured"})
    }
})
teacher.post('/signin',async(req,res)=>{
    const {teacher_id,password} = req.body;
    try{
        const con = await client.connect();
        let sqlCommand = `SELECT * FROM teachers WHERE id='${teacher_id}'`;
        let {rows} = await con.query(sqlCommand);
        if(rows.length == 0)         // to check if this user with this id is exist or not.
            return res.status(400).josn({msg:"Invalid id or password,please check agian."})
        
        let checkPass = await bcrypt.compare(password,rows[0].password)
        if(!checkPass)  //this to check if the password matches or not.
            return res.status(400).json({msg:"Invalid id or password"});
        let token = jwt.sign({
            username : rows[0].name,
            id: rows[0].id, 
            isAdmin: false,
            isTeacher : true,
        },process.env.JWTPASS);
        sqlCommand = `SELECT C.* FROM teaching AS T,courses AS C
            WHERE teacher_id = '${teacher_id}' AND C.course_id = T.course_id;
        `
        let {rows:courses} = await con.query(sqlCommand)
        delete rows[0].password; // delete the password to not send it to the backend.
        return res.status(200).json({data:{
            user_id:teacher_id,
            username:rows[0].username,
            title:rows[0].title,
            department:rows[0].department,
            subdepartment:rows[0].sub_department
        },token,courses})
    }
    catch(err){}
})

teacher.post('/registercourses',async(req,res)=>{
    const {teacher_id,courses,teacher_name} = req.body;
    let con; 
    try{
        con = await client.connect();
        let sqlCommand = 
        `INSERT INTO teaching (teacher_id,course_id,teacher_name,course_name)
         VALUES
            ${courses.map(course=> `('${teacher_id}','${course.course_id}','${teacher_name}','${course.course_name}')`)};`;
        await con.query(sqlCommand);
        return res.status(201).json({msg:"your courses is registered"});
    }
    catch(err){
        console.log(err)
    }
    finally{
        con.release();
    }
})
teacher.get('/data/',async(req,res)=>{

    const {teacher_id,dataType} = req.query;
    let con,sqlCommand;
    try{
        con = await client.connect();
        sqlCommand = SQLFilter(dataType,teacher_id);
        const {rows} = await con.query(sqlCommand)
        res.status(200).json(rows);

    }catch(err){
        console.log(err)
    }
})

export default teacher;