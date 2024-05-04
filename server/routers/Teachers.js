import { Router } from "express";
import client from "../databse.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const teacher = Router();



teacher.post('/signup',async(req,res)=>{
    const {username,id,password,title,department,subdepartment} = req.body;
    console.log(req.body);
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
        res.status(201).json({data:{username,title,department,subdepartment},token});

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
        const {rows} = await con.query(sqlCommand);
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
        
        delete rows[0].password; // delete the password to not send it to the backend.
        return res.status(200).json({data:rows[0],token})
    }
    catch(err){}
})
export default teacher;