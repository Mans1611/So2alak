import { Router } from "express";
import client from "../databse.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const teacher = Router();

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