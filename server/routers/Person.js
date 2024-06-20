import { query, Router } from "express"
import client from "../databse.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import DefaultCourses from "../utilis/DefaultCourses.js";
import { sendEmail } from "../mailer/Mailer.js";
import multer from "multer";
const storage = multer.memoryStorage();
const uploader = multer({storage:storage})
import {v2 as cloudinary} from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret:process.env.CLOUDINARY_APISECRET
})


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
        if(databaseResponse.rows.length > 0){
            conn.release()
            return res.status(400).json({msg:"Your Username or id may be exist"});
        }
        const salt = await bcrypt.genSalt(parseInt(process.env.Salt));
        const hashedPass =  await bcrypt.hash(password,salt) // encrypting the password 
       if(student_department){
           sqlCommand = `INSERT INTO students (student_id,username,student_level,password,student_department,student_subDepartment) 
           VALUES('${student_id}','${username}','${studnet_level}','${hashedPass}','${student_department}',${student_subdepartment?`'${student_subdepartment}'`:null})
           RETURNING *;`;
        }
       else{
            sqlCommand = `INSERT INTO students (student_id,username,student_level,password) 
                        VALUES('${student_id}','${username}','${studnet_level}','${hashedPass}') 
                        RETURNING *;`;
        }
                        // I created person in the database.
        const person = await conn.query(sqlCommand);
        // creating a token for the user. 
        const token = jwt.sign({
            username,
            student_id,
            isAdmin:false,
            isTeacher:false,
        },process.env.JWTPASS);
        const courses = await DefaultCourses(studnet_level,student_department,student_subdepartment);
        // sendEmail(student_id,
        //     [['${username}',username],
        //     ['${verfication_code}',1611254]])
        conn.release(); // release the connection with the database
        console.log(person)
        return res.status(201).json({data:person.rows[0],sugesstedCourses : courses,token});
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
       
        return res.status(200).json({msg:"Welcome",student:rows[0]});
    }catch(err){
        console.log(err)
    }
})
person.put('/defualtCourses',async(req,res)=>{
    try{
        const {level,department,sub_department} = req.body;
        const courses = await DefaultCourses(level,department,sub_department)
        return res.status(200).json(courses)
    }catch(err){
        console.log(err)
    }
})
person.post('/registercourse',async(req,res)=>{
    const {student_id,username,user_courses} = req.body // studentCourses is an array of courses that the studnet choose to follow
    if(!username)
        return res.status(400).json({msg : 'No provided id'})
    try{
        // as I will insert many values in the table as he might register many courses.
        let sqlCommand = 
        `INSERT INTO students_courses (student_name,course_id)
         VALUES
            ${user_courses.map(course=> `('${username}','${course.course_id}')`)};`;
           
            
        const con = await client.connect();
        await con.query(sqlCommand);
        if (user_courses.length === 1 ){
            sqlCommand = `SELECT * from courses WHERE course_id = '${user_courses[0].course_id}'`
            const {rows} = await con.query(sqlCommand)
            con.release();
            return res.status(201).json({course:rows[0]})
        }
        con.release();
        return res.status(201).json({msg:"Done"})
    }catch(err){
        console.log(err)
        
    }

})
person.put('/editProfileImg/:student_id',uploader.single('image'),async(req,res)=>{
    const {student_id} = req.params;
    try{
        let sqlCommand;
        if (req.file){
            const con = await client.connect();
            const { originalname, mimetype, buffer} = req.file;
            
                const imgCloud = await cloudinary.uploader.upload_stream({
                    folder: 'persons' // Optional: specify the folder
                },async(err,result)=>{
                    if(err){
                        console.log("faild to upload image"); 
                    }
                    if(result.secure_url){
                        sqlCommand = `UPDATE  students
                                    SET img_url = '${result.secure_url}'
                                    WHERE student_id='${student_id}';`;
                        await con.query(sqlCommand);
                    }
                    res.status(201).json({'data':result.secure_url});
                })
                imgCloud.end(req.file.buffer);
            }else{
                res.status(400).json({msg:"No File uploaded"});
            }

    }catch(err){
        console.log(err)
    }
})
person.get('/getBadges/:student_id',async(req,res)=>{
    const {student_id} = req.params;
    try{
        const con = await client.connect();
        let sqlCommand = `SELECT * FROM earned_badges
        WHERE student_id = '${student_id}';`
        const {rows} = await con.query(sqlCommand)
        res.status(200).json({badges:rows})

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
        con.release();
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
        
        data = {...data.data,...result.rows[0]}
        con.release()
        console.log(data)
        return res.status(200).json({...data})
    }catch(err){

    }
})
person.get('/get_activity_log/:student_id',async(req,res)=>{
    const {student_id} = req.params;
    console.log(student_id)
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

person.get('/leaderboard',async(req,res)=>{
    const {level,course_id} = req.query;
    const con = await client.connect();
    try{
        if (course_id == 'undefined' || course_id === 'General'){
            console.log(course_id)
            let sqlCommand = `SELECT * FROM students WHERE student_level = '${level}' ORDER BY points DESC LIMIT 10`
            const {rows} = await con.query(sqlCommand);
            res.status(200).json({data:rows})
        }
        else{
            let sqlCommand = `
            SELECT al.student_id ,course_id,username, SUM(al.points) AS points FROM activity_log al , students S
            WHERE course_id = '${course_id}'  AND S.student_id = al.student_id
            GROUP BY al.student_id, course_id,username
            ORDER BY points DESC LIMIT 10;`
            const {rows} = await con.query(sqlCommand);
            res.status(200).json({data:rows})
        }
    }catch(err){
        console.log(err);
    }
    finally{
        con.release()
    }
})

person.get('/getStudnetPersonalDetails/:student_id',async(req,res)=>{
    const {student_id} = req.params;
    const con = await client.connect();
    try{
        let sqlCommand
        sqlCommand = `
        SELECT * FROM (SELECT
            *,
         ROW_NUMBER() OVER (ORDER BY points) AS row_rank
         FROM
         students) AS ranked
         WHERE ranked.student_id = '${student_id}';`
         const {rows} = await con.query(sqlCommand) 
         console.log(student_id)
         sqlCommand = `
         SELECT * FROM (SELECT
             *,
          ROW_NUMBER() OVER (ORDER BY points) AS row_rank
          FROM
          students) AS ranked
          WHERE ranked.username = '${student_id}';`

        const {rows:usernameData} = await con.query(sqlCommand)
        res.status(200).json({data:{...rows[0],...usernameData[0]}})
        con.release()
    }catch(err){
        con.release()
        console.log(err)
    }
})
export default person;