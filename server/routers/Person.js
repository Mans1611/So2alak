import { Router } from "express"
import client from "../databse.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
        let sqlCommand = `SELECT * FROM students WHERE student_id='${student_id}' OR username='${username}'`;
        let databaseResponse = await conn.query(sqlCommand);
        // check if this student_id has an account already or not.
        if(databaseResponse.rows.length > 0)
            return res.status(400).json({msg:"This id is already exists, try login"});

        const salt = await bcrypt.genSalt(parseInt(process.env.Salt));
        const hashedPass =  await bcrypt.hash(password,salt) // encrypting the password 
        
        sqlCommand = `INSERT INTO students (student_id,username,student_level,password,student_department,student_subDepartment) VALUES($1,$2,$3,$4,$5,$6)`;
        // I created person in the database.
        await conn.query(sqlCommand,[student_id,username,studnet_level,hashedPass,student_department,student_subdepartment]);
        // creating a token for the user. 
        const token = jwt.sign({username,student_id},process.env.JWTPASS);
        const courses = await DefaultCourses(studnet_level,student_department,student_subdepartment);
        
        conn.release(); // release the connection with the database
        return res.status(200).json({sugesstedCourses : courses,token});
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
    const {student_name,studentCourses} = req.body // studentCourses is an array of courses that the studnet choose to follow
    
    if(!student_name)
        return res.status(400).json({msg : 'No provided id'})
    
    try{
        // as I will insert many values in the table as he might register many courses.
        let sqlCommand = 
        `INSERT INTO students_courses (student_name,course_id)
         VALUES
            ${studentCourses.map(course=> `('${student_name}','${course.course_id}')`)};
        `
        const con = await client.connect();
        await con.query(sqlCommand);
        con.release();
        return res.status(201).json({msg:"Done"})
    }catch(err){
        console.log(err)
    }

})


person.get('/getStudentCourses/:s_name',async(req,res)=>{
    const {s_name} = req.params;
    
    try{
        const con = await client.connect();
        // must have another join with files table for logo of each courses
        let sqlCommand = `
        SELECT * FROM students_courses AS sc 
        INNER JOIN courses ON courses.course_id = sc.course_id
        WHERE sc.student_name='${s_name}';`;

        const {rows} = await con.query(sqlCommand);
        con.release()
        return res.status(200).json({'data':rows})
    }catch(err){
        console.log(err);
    }
})

person.get('/personalInfo/:student_name',async(req,res)=>{
    // don't forget to add badges count and auth for that.
    const {student_name} = req.params;
    try{
        const con = await client.connect();
        let sqlCommand = 
        `SELECT COUNT (q_username) as no_questions, q_username FROM questions 
        WHERE q_username = '${student_name}'
        GROUP BY q_username;`
        let result = await con.query(sqlCommand)
        let data = {data : result.rows[0]} 
        
        sqlCommand = 
        `SELECT COUNT (ans_username) as no_answers, ans_username FROM answers 
        WHERE ans_username = '${student_name}'
        GROUP BY ans_username;`

        result = await con.query(sqlCommand)
        
        data = {...data,...result.rows[0]}
        con.release()
        return res.status(200).json({...data})
    }catch(err){

    }
})
person.get('/get_activity_log/:student_id',async(req,res)=>{
    const {student_id} = req.params;
    try{
        const con = await client.connect();
        let sqlCommand = `SELECT student_id , TO_CHAR(DATE(activity_time),'DD-MM-YYYY') AS date 
                          FROM activity_log
                          WHERE student_id = '${student_id}';`;
        const {rows} = await con.query(sqlCommand);
        res.status(200).json({
            student_id:rows[0]?.student_id,
            dates:rows.map(item=>item.date)
        });
        con.release();
    }catch(err){
        console.log(err)
    }
})
export default person;