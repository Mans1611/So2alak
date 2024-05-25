
import { Router } from "express";
import client from "../databse.js";

const lists = Router();

lists.get('/allLists/:student_id',async(req,res)=>{
    const {student_id} = req.params;
    const con = await client.connect();
    try{
        let sqlCommand = `SELECT * FROM lists WHERE student_id = '${student_id}';`;
        if (student_id){
            const {rows} = await con.query(sqlCommand);
            res.status(200).json({data:rows});
        }else{
            res.status(400).json({msg:"error ocuured"});
        }
        con.release();

    }catch(err){
        console.log(err)
    }

})

lists.get('/:list_id',async(req,res)=>{
    const {list_id} = req.params;
    const con = await client.connect();
    try{
        let sqlCommand = `
            SELECT FQ.*, Q.*, ans.*
            FROM fav_questions FQ
            JOIN Questions Q ON FQ.q_id = Q.question_id
            LEFT JOIN  (
                SELECT *
                FROM answers
                LEFT JOIN questions Q 
                ON answers.q_id = Q.question_id
                ORDER BY answers.ans_verified, answers.ans_upvotes DESC
                LIMIT 1
            ) ans ON ans.q_id = FQ.q_id
            WHERE FQ.list_id = ${list_id};`;

        if(list_id){
            const {rows} = await con.query(sqlCommand);
            sqlCommand = `SELECT * FROM lists WHERE list_id = ${list_id}`
            const result = await con.query(sqlCommand); 
            res.status(200).json({list:result.rows[0],data:rows.map((ques)=>{return {...ques,answers:[{
                ...ques
            }]}})});
        }
    }catch(err){
        console.log(err)
    }
    finally{
        con.release();
    }
})
lists.post('/createlist',async(req,res)=>{
    const {list_name,isPrivate,student_id} = req.body;
    const con = await client.connect();
    try{
        const sqlCommand = `INSERT INTO lists (student_id,list_name,private) 
        VALUES ('${student_id}','${list_name}',${isPrivate})
        RETURNING * ;`;
        const {rows} = await con.query(sqlCommand);
        con.release();
        return res.status(201).json({data:rows[0]});
    }catch(err){
        con.release();
        console.log(err);
    }
})

lists.delete('/deleteList/:list_id',async(req,res)=>{
    const {list_id} = req.params;
    const con = await client.connect();
    try{
        if(list_id){
            let sqlCommand = `DELETE FROM lists WHERE list_id=${list_id};`
            const {rows} = await con.query(sqlCommand);
            res.status(200).json({msg:"List is Deleted"});
        }else{
            res.status(400).json({msg:"Please provide list_id"});
        }
        con.release()
    }catch(err){
        con.release();
        console.log(err);
    }
})
export default lists;