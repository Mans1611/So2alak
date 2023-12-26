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
    // this api need to check the the auth of the user.
    const {course_id,student_id,question} = req.body;
    try{
        const con = await client.connect(); 
        let sqlCommand = `INSERT INTO questions (course_id,q_student_id,question) VALUES ('${course_id}','${student_id}','${question}');`;
        const result = await con.query(sqlCommand);
        con.release();
        res.status(201).json({'msg':'Your question is posted'});
    }catch(error){
        console.log(error);
        res.status(400).json({'msg':'an error occured, Try again'});
    }
})


// done by Eng. Mostafa
post.post("/createAnswer", async(req, res)=>{
     // this api need to check the the auth of the user.
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

post.get('/getQuestion/:question_id',async(req,res)=>{
    // this might not needs auth -> like face when you dont have an account, but you still can see the post.
    const {question_id} = req.params; // I set  question_id = 1 from Postman.
    req.params.question_id = 'Mansour' // I have changed the value of the original value
    
    try{
        const con = await client.connect();
        const sqlCommand = `
        SELECT *,st.studnet_name as student_name_answer  FROM(
            SELECT *
            FROM questions q
            WHERE q.question_id = ${question_id}
        ) q 
        LEFT JOIN answers ans ON q.question_id = ans.q_id
        Left JOIN students s ON s.student_id = q.q_student_id 
        Left JOIN students st ON st.student_id = ans.student_id_ans ;`;
        const result = await con.query(sqlCommand);
        res.json({'data':result.rows});
    }catch(error){
        console.log(error)
    }
}
)
post.put('/upvoteQuestion/:q_id',async(req,res)=>{
    // in this function needs auth.
    // need to take the student_id , in order not to make multile upvotes

    const {q_id} = req.params;
    const {student_id} = req.body;
    try{
        const con = await client.connect();
        const sqlCommand = `
        UPDATE questions 
        SET q_upvotes = q_upvotes + 1
        WHERE question_id = ${q_id};`
        await con.query(sqlCommand);
        res.status(200).send("Done"); 
    }catch(err){
        console.log(err);
        res.send(err);
    }
})
post.put('/downvoteAnswer/:ans_id',async(req,res)=>{
    // in this function needs auth.
    // need to take the student_id , in order not to make multile upvotes

    const {ans_id} = req.params;
    const {student_id,cancle_downvote} = req.body; // we will need it later on.
    try{
        const con = await client.connect();
        let sqlCommand = `
        UPDATE answers 
        SET ans_downvotes = ans_downvotes + 1
        WHERE answer_id = ${ans_id};`
        if (cancle_downvote){ // دي عشان لو نفس الطالب حب يلغي الداون فوت اللي عمله
            sqlCommand = `
            UPDATE answers 
            SET ans_downvotes = ans_downvotes - 1
            WHERE answer_id = ${ans_id};`
        }

        await con.query(sqlCommand);
        res.status(200).send("Answer downvoted Done"); 
    }catch(err){
        console.log(err);
        res.send(err);
    }
})

post.delete('/deleteQuestion/:q_id',async(req,res)=>{
    const {q_id} = req.params;
    try{
        const con = await client.connect()
        const sqlCommand = `DELETE FROM questions WHERE question_id = ${q_id};`;
        await con.query(sqlCommand);
        res.send("Deleted Question");
    }catch(err){
        console.log(err)
        res.send(err);
    }
})


export default post;