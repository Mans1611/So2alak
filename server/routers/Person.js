import { Router } from "express"
import client from "../databse.js";
import bcrypt from 'bcrypt';
const person = Router();
import dotenv from 'dotenv';
dotenv.config();
person.post('/signup',async(req,res)=>{
    const {username,student_id,password,studnet_level}=req.body;
    try{
        const conn = await client.connect(); // conecting with database
        let sqlCommand = `SELECT * FROM students WHERE student_id=${student_id} OR studnet_name='${username}'`;
        const {rows} = await conn.query(sqlCommand);
        console.log(rows)
        // check if this student_id has an account already or not.
        if(rows.length > 0)
            return res.status(400).json({msg:"This id is already exist s, try login"});

        const salt = await bcrypt.genSalt(parseInt(process.env.Salt));
        const hashedPass =  await bcrypt.hash(password,salt)
        sqlCommand = `INSERT INTO students (student_id,studnet_name,student_level,password) VALUES($1,$2,$3,$4)`;
        conn.query(sqlCommand,[student_id,username,studnet_level,hashedPass]);
        conn.release(); // release the connection with the database
        res.status(200).send('Done')
    }   
    catch(err){
        console.log(err);
    }
})


export default person;