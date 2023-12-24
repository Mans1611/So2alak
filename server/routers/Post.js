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

post.post('/createQuestion',async(req,res)=>{
    const {course_id,student_id,question} = req.body;
    try{
        const con = await client.connect(); 
        let sqlCommand = `INSERT INTO questions (course_id,student_id,question) VALUES ('${course_id}','${student_id}','${question}');`;
        const result = await con.query(sqlCommand);
        con.release();
        res.status(201).json({'msg':'Your question is posted'});
    }catch(error){
        console.log(error);
        res.status(400).json({'msg':'an error occured, Try again'});
    }
})


// done bu Eng. Mostafa
post.post("/createAnswer", async(req, res)=>{
    try {
        const {answer, student_id, question_id} = req.body;
        const con = await client.connect();
        const sqlCommand = `INSERT INTO answers (answer,student_id,question_id) 
        VALUES ('${answer}', '${student_id}', ${question_id});`
        await con.query(sqlCommand);
        con.release();
        res.status(201).json({'msg': 'you answered sucessfully'});
    } catch(error) {
        console.log(error);
        res.status(400).json({'msg': 'an error occured, Try again'});
    }
})


// params 
post.get('/getQuestion/:question_id',async(req,res)=>{
    const {question_id} = req.params;
    try{
        const con = await client.connect();
        const sqlCommand = `SELECT * 
        FROM questions AS Que, answers AS Ans, Students as st
        WHERE Que.question_id = ${question_id} AND Que.question_id = Ans.question_id
        AND st.student_id = que.student_id AND st.student_id = Ans.student_id;`;
        const result = await con.query(sqlCommand);
        res.json({'data':result.rows});
    }catch(error){
        console.log(error)
        
    }
}
)
export default post;