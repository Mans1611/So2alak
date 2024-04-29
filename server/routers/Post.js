import { Router } from "express";
import client from "../databse.js";
import { CheckValueExisit } from "../utilis/CheckValueExisit.js";
import { AggregateQuestionsAnswers } from "../utilis/AggregateQuestionsAnswers.js";
import { MakeActivity } from "../utilis/MakeActivitylog.js";
import multer from "multer";
import { GetFiles } from "../utilis/GetFiles.js";
import { CheckAuth } from "../middleware/CheckAuth.js";
import b2 from "../Bucket/Bucket.js";
import { sendEmail } from "../mailer/Mailer.js";
import { io } from "../index.js";
import { GiveSimpleBadge } from "../utilis/GiveSimpleBadge.js";



const storage = multer.memoryStorage();
const uploader = multer({storage:storage})
const post = Router();
/* 
1 - middleware for authntication 
*/

post.get('/allquestions/',async(req,res)=>{
    const {student_name,student_id,filter} = req.query;
    let length = 5;
    try {
        const con = await client.connect();
         //LIMIT ${length} OFFSET ${page * 5}
        let sqlCommand = FilterSQLQuery(filter,student_id,student_name); 
        const result = await con.query(sqlCommand);
        let data = await GetFiles(result.rows,con)
        data = AggregateQuestionsAnswers(data);
        con.release();
        return res
        .status(200)
        .json({data});
    } catch (error) {
        console.log(error)
    }
})


post.post('/createQuestion',/*CheckAuth,*/uploader.single('image'),async(req,res)=>{
    // this api need to check the the auth of the user.
    const {course_id,student_id,username,question} = req.body;
    let con = null;
    try{
        con = await client.connect(); 
        let sqlCommand = null;
        let result = null;
        // to check if the student exist or not
        if (! await CheckValueExisit('students','username',username,client))
            return res.status(400).json({msg:"this user is not exist"})
        
        // to check if the course exist or not
        if (! await CheckValueExisit('courses','course_id',course_id,client))
            return res.status(400).json({msg:"this course is not exist"})
        
        sqlCommand = `INSERT INTO questions (course_id,q_username,question) 
            VALUES ('${course_id}','${username}','${question}')
            RETURNING question_id;`;
        const {rows} = await con.query(sqlCommand);
        if (req.file){
            sqlCommand = `INSERT INTO files (filename,mimtype,data) 
            VALUES ($1,$2,$3) RETURNING id;`
            const { originalname, mimetype, buffer} = req.file;
            result = await con.query(sqlCommand,[originalname,mimetype,buffer])
            const url = await b2.getUploadUrl({
                bucketId: process.env.BUCKET_ID
            });
            const uploadedFile = await b2.uploadFile({
                uploadAuthToken: url.data.authorizationToken,
                fileName: `question_${rows[0].question_id}`,
                uploadUrl:url.data.uploadUrl,
                data:buffer,
                fileInfo:{
                    mimetype,
                    originalname,  
                }
            })
        }
        const badge = await GiveSimpleBadge(student_id,'First Question',course_id,con)
        res.status(201).json({'msg':'Your question is posted',badge});
        await MakeActivity(student_id,'ask',rows[0].question_id,4,con,null);
        con.release();
        
    }catch(error){
        con.release();
        console.log(error)
        res.status(400).json({'msg':'an error occured, Try again'});
    }
});
import axios from 'axios';
import { FilterSQLQuery } from "../utilis/FilterSQLQuery.js";

post.get('/getPicture',async(req,res)=>{
    let auth = await b2.authorize() 
    let result = await axios.get(`${auth.data.apiUrl}/file/${process.env.BUCKET_NAME}/question_57`,{
        responseType: 'arraybuffer',
        headers:{
            Authorization: auth.data.authorizationToken,
        }
    })
    console.log(result)
    return res.send(Buffer.from(result.data).toString('base64'))
})
post.delete('/deleteQuestion/:q_id',async(req,res)=>{
    // delete the question for the database, still need :
    //  1 - Auth & Authorization.
    const {q_id} = req.params;
    try{
        const con = await client.connect()
        const sqlCommand = `DELETE FROM questions WHERE question_id = ${q_id};`;
        await con.query(sqlCommand);
        con.release();
        res.status(200).send("Deleted Question");
        axios
    }catch(err){
        console.log(err)
        res.send(err);
        con.release();
    }
});

post.put('/modifyQuestion/:q_id', async(req, res)=>{
    const {q_id} = req.params;
    const {q_username, question} = req.body;
    try {
        const con = await client.connect();
        const sqlCommand = `
            UPDATE questions
            SET question = '${question}'
            WHERE q_username = '${q_username}'
            AND question_id = ${q_id};
        `;
        await con.query(sqlCommand);
        con.release();
        res.send('Question is modified');
    } catch(err) {
        console.log(err);
        res.send(err);
    }
});

post.put('/upvoteQuestion/:q_id',async(req,res)=>{
    // in this function needs auth.
    // need to take the student_id , in order not to make multiple upvotes.
    const {q_id} = req.params;
    const {student_id,course_id,helped} = req.body;
    try{
        const con = await client.connect();
        let sqlCommand = null
        if (helped){
            sqlCommand=`
            UPDATE questions 
            SET q_upvotes = q_upvotes + 1
            WHERE question_id = ${q_id};`
            await con.query(sqlCommand);
            await MakeActivity(student_id,'help',q_id,0,con,null,course_id);
        }
        else{
            sqlCommand=`
            UPDATE questions 
            SET q_upvotes = q_upvotes - 1
            WHERE question_id = ${q_id};
            DELETE FROM activity_log 
            WHERE student_id='${student_id}' AND 
            question_id=${q_id} AND 
            activity_type='help';`
            await con.query(sqlCommand);
        }
        res.status(200).send("Done"); 
        con.release()
    } catch(err){
        console.log(err);
        res.send(err);
    }
});

post.put('/verifyQuestion/:q_id', async(req, res)=>{
    const {q_id} = req.params;
    try {
        const con = await client.connect();
        const sqlCommand = `
            UPDATE questions 
            SET q_verified = true
            WHERE question_id = ${q_id};
        `;
        await con.query(sqlCommand);
        con.release();
        res.status(200).send('Question is verified');
    } catch(err) {
        console.log(err);
        res.send(err);
    }
});

post.get('/getQuestion/',async(req,res)=>{
    // this might not needs auth -> like face when you dont have an account, but you still can see the post.
    const {question_id,student_id} = req.query; // I set  question_id = 1 from Postman.
    console.log(student_id)
    try{
        const con = await client.connect();
        const sqlCommand = `SELECT * FROM questions  as q
                            LEFT JOIN answers as ans
                            ON q.question_id = ans.q_id
                            LEFT JOIN (SELECT course_id,course_name 
                                FROM courses) AS c 
                                ON c.course_id = q.course_id 
                            LEFT JOIN activity_log AS al 
                            ON al.question_id = q.question_id
                            WHERE q.question_id = ${question_id} 
                            AND al.student_id = ${student_id? `${student_id}`: null }
                            ORDER BY ans.ans_verified DESC , ans.ans_upvotes DESC,
                            ans.ans_time DESC;`;
        const result = await con.query(sqlCommand);
        const data = AggregateQuestionsAnswers(result.rows)
        res.status(200).json({'data':data[question_id]});
        con.release()
    }catch(error){
        console.log(error)
    }
})

post.get('/getUnverifiedQuestions', async(req, res)=>{
    try {
        const con = await client.connect();
        const sqlCommand = `
            SELECT * 
            FROM questions
            WHERE q_verified = false;
        `;
        const {rows} = await con.query(sqlCommand);
        con.release();
        res.status(200).json({
            'data': rows
        });
    } catch(err) {
        con.release();
        console.log(err);
        res.send(err);
    }
});

// Answers
post.post("/createAnswer", async(req, res)=>{
    // this api need to check the the auth of the user.
    const {answer, ans_username, student_id, question_id} = req.body;
    try {
        const con = await client.connect();
        const sqlCommand = `
            INSERT INTO answers (answer, ans_username, q_id) 
            VALUES ('${answer}', '${ans_username}', ${question_id})
            RETURNING *;`;
        const {rows} = await con.query(sqlCommand);
        const badge = await GiveSimpleBadge(student_id,'First Answer',null,con)
        if (badge){
            res.status(201).json({'msg': 'you answered sucessfully',badge});
        }
        else{
            res.status(201).json({'msg': 'you answered sucessfully',badge:false});
        }
        io.emit('question-change',rows[0]);
        MakeActivity(student_id, 'answer', question_id, 5 ,con, rows[0].answer_id);
        con.release();
    } catch(error) {
        console.log(error);
        res.status(400).json({'msg': 'an error occured, Try again'});
    }
});

// need authorization.
post.delete('/deleteAnswer/:ans_id', async(req, res)=>{
    const {ans_id} = req.params;
    try {
        const con = await client.connect();
        const sqlCommand = `
            DELETE FROM answers
            WHERE answer_id = ${ans_id};
        `;
        await con.query(sqlCommand);
        con.release();
        res.status(200).send('Answer is deleted');
    } catch(err) {
        con.release();
        console.log(err);
        res.send(err);
    }
});

post.put('/modifyAnswer/:ans_id', async(req, res)=>{
    const {ans_id} = req.params;
    const {answer, ans_username} = req.body;
    try {
        const con = await client.connect();
        const sqlCommand = `
            UPDATE "answers"
            SET answer = '${answer}'
            WHERE answer_id = ${ans_id}
            AND ans_username = '${ans_username}';
        `;
        await con.query(sqlCommand);
        con.release();
        res.status(200).send('Answer is modified');
    } catch(err) {
        con.release();
        console.log(err);
        res.send(err);
    }
});

post.put('/upvoteAnswer/:ans_id', async(req, res)=>{
    // this method needs auth.
    const {ans_id} = req.params;
    try {
        const con = await client.connect();
        const sqlCommand = `
            UPDATE answers
            SET ans_upvotes = ans_upvotes + 1
            WHERE answer_id = ${ans_id};
        `;
        await con.query(sqlCommand);
        con.release();
        res.status(200).send('Answer is upvoted');
    } catch(err) {
        console.log(err);
        con.release();
        res.send(err);
    }
});

post.put('/downvoteAnswer/:ans_id',async(req, res)=>{
    // in this function needs auth.
    // need to take the student_id , in order not to make multile upvotes
    const {ans_id} = req.params;
    const {student_id, cancel_downvote} = req.body; // we will need it later on.
    try{
        const con = await client.connect();
        let sqlCommand = `
            UPDATE answers 
            SET ans_downvotes = ans_downvotes + 1
            WHERE answer_id = ${ans_id};
        `;
        if(cancel_downvote) { // دي عشان لو نفس الطالب حب يلغي الداون فوت اللي عمله
            sqlCommand = `
                UPDATE answers 
                SET ans_downvotes = ans_downvotes - 1
                WHERE answer_id = ${ans_id};
            `;
        }
        await con.query(sqlCommand);
        con.release()
        res.status(200).send("Answer downvoted Done"); 
    } catch(err) {
        con.release()
        console.log(err);
        res.send(err);
    }
});

post.put('/verifyAnswer/:ans_id', async(req, res)=>{
    const {ans_id} = req.params;
    try {
        const con = await client.connect();
        const sqlCommand = `
            UPDATE answers 
            SET ans_verified = true
            WHERE answer_id = ${ans_id};
        `;
        await con.query(sqlCommand);
        con.release();
        res.status(206).send('Answer is verified');
    } catch(err) {
        con.release();
        console.log(err);
        res.send(err);
    }
});

post.put('/unverifyAnswer/:ans_id', async(req, res)=>{
    const {ans_id} = req.params;
    try {
        const con = await client.connect();
        const sqlCommand = `
            UPDATE answers 
            SET ans_verified = false
            WHERE answer_id = ${ans_id};
        `;
        await con.query(sqlCommand);
        con.release();
        res.status(200).send('Answer is unverified');
    } catch(err) {
        con.release();
        console.log(err);
        res.send(err);
    }
});

post.get('/getVerifiedAnswers', async(req, res)=>{
    const {ans_verified} = req.body;
    try {
        const con = await client.connect();
        const sqlCommand = `
            SELECT *
            FROM answers
            WHERE ans_verified = true;
        `;
        const {rows} = await con.query(sqlCommand);
        con.release();
        res.status(200).json({
            'data': rows
        });
    } catch(err) {
        con.release();
        console.log(err);
        res.status(404).send(err);
    }
});

// Fav Ques
post.post('/addToFavQues',async(req,res)=>{
    const {s_id,q_id,username,course_id,bookMarked,list_id} = req.body;
    console.log(req.body)
    try{
        const con = await client.connect();
        let sqlCommand;
        if (list_id){
            // to add it to a spesific list which the user create before 
            sqlCommand = `INSERT INTO fav_questions(s_id,username,q_id,course_id,list_id)
            VALUES ('${s_id}','${username}',${q_id},'${course_id}',${list_id});`
        }
        else if (bookMarked){
            // to added it the list which is the course 
            sqlCommand = `INSERT INTO fav_questions(s_id,username,q_id,course_id)
            VALUES ('${s_id}','${username}',${q_id},'${course_id}');`
        }
        else {
            sqlCommand = `DELETE FROM fav_questions WHERE s_id = '${s_id}' AND username = '${username}' AND q_id = ${q_id};`    
        }
        await con.query(sqlCommand);
        con.release();
        return res.status(201).json({msg:'Questions is added to your list'})
        
    }catch(err){
        console.log(err)
    }
})

post.delete('/deleteFromFavQues', async(req, res)=>{
    const {q_id} = req.body;
    try {
        const con = await client.connect();
        const sqlCommand = `
            DELETE FROM fav_questions
            WHERE q_id = ${q_id};
        `;
        await con.query(sqlCommand);
        con.release();
        res.status(200).send('Question is deleted from favorite');
    } catch(err) {
        con.release();
        console.log(err);
        res.send(err);
    }
});

post.get('/:course_code',async(req,res,next)=>{
    // this get all of the questions related to the course code provided.
    const {course_code} = req.params;
    try{
        if (!CheckValueExisit('courses','course_id',course_code,client))
            return res.status(400).json({msg:"This Course dosn't exist"})
        const con = await client.connect();
        let sqlCommand = `SELECT * FROM questions as q 
                          LEFT JOIN (
                            SELECT course_name,course_id 
                            FROM courses ) AS c
                            ON c.course_id = q.course_id
                          WHERE q.course_id = '${course_code}'
                          ORDER BY q_time DESC;`

        const result = await con.query(sqlCommand);
        let newData =  await GetFiles(result.rows,con)
        const data = AggregateQuestionsAnswers(newData)
        con.release()
        res.status(200).json({data:data})
        next()
    }catch(err){
        con.release()

    }
})

post.get('/search/:search',async(req,res)=>{
    const {search} = req.params;
    try{
        const con = await client.connect();
        const {rows:students} = await con.query(`SELECT * FROM students WHERE username ILIKE '%${search}%';`);
        const {rows:courses} = await con.query(`SELECT * FROM courses WHERE course_name ILIKE '%${search}%';`);
        const {rows:questions} = await con.query(`SELECT * FROM questions WHERE question ILIKE '%${search}%';`);
        res
        .status(200)
        .json({
            students,
            courses,
            questions
        })
        con.release();
    }
    catch(err){
        con.release();
        console.log(err)
    }
});

export default post;