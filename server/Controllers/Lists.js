import { isValidJSON } from "../utilis/isVailidJSON.js";
import client from "../databse.js";
import redisClient  from "../redis.js";

export class Lists{

    getAllLists = async(req,res)=>{
        const {student_id} = req.params;
        const con = await client.connect();
        const {sameUser} = req.query;
        try{
            console.log("passed in here")
            let sqlCommand;
            if (sameUser === 'false'){
                sqlCommand = `SELECT * FROM lists WHERE student_id = '${student_id}' AND private = false;`
            }else{
                sqlCommand = `SELECT * FROM lists WHERE student_id = '${student_id}';`
            }
            console.log(sameUser)
            if (student_id){
                let cachedValue = undefined;
                //cachedValue = await redisClient.get(`lists:${student_id}`)
                if(isValidJSON(cachedValue)){
                    cachedValue = JSON.parse(cachedValue)
                }
                if(cachedValue && cachedValue.length !== 0){
                    return res.status(200).json({data:cachedValue})
                }
                const {rows} = await con.query(sqlCommand); // sending the query above to the database instance 
                // await redisClient.set(`lists:${student_id}`,JSON.stringify(rows),{ // setting the values in the cache for 12 Hrs
                // EX:43200// in seconds, this means 12H
                // })
                res.status(200).json({data:rows});
            }else{
                res.status(400).json({msg:"No Id provided"});
            }
            con.release();
    
        }catch(err){
            console.log(err)
        }
    }

    getSpesificList = async(req,res)=>{
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
    }
    updateList = async(req,res)=>{
        const {list_id,change} = req.body;
        let con;
        try{
            con = await client.connect();
            let sqlCommand ;
            if(change === 'INCREMENT_VIEW'){
                sqlCommand = `UPDATE lists SET viewed = viewed + 1 WHERE list_id = ${list_id}`
            }else{
                sqlCommand = `UPDATE lists SET copied = copied + 1 WHERE list_id = ${list_id}`
            }
            await con.query(sqlCommand);
            res.status(200).json({msg:"done"});
        }catch(err){
            console.log(err);
        }finally{
            con.release();
        }
    }

    copyList = async(req,res)=>{
        const {recieveStudent,list_id,list_name} = req.body;
        let con;
        try{
            con = await client.connect();
            let sqlCommand = `SELECT * FROM fav_questions WHERE list_id = ${list_id};`;
            const {rows:copiedQuestions} = await con.query(sqlCommand);
            sqlCommand = `INSERT INTO lists (student_id,list_name,private) 
            VALUES ('${recieveStudent.student_id}','${list_name}',false) RETURNING *;`;
            const {rows:newList} = await con.query(sqlCommand);
            sqlCommand = `
                INSERT INTO fav_questions (s_id,username,course_id,q_id,list_id)
                VALUES 
                ${copiedQuestions.map(ques=>`('${recieveStudent.student_id}','${recieveStudent.username}','${ques.course_id}',${ques.q_id},${newList[0].list_id})`)};
                UPDATE lists SET copied = copied + 1 WHERE list_id = ${list_id};
                `
            await con.query(sqlCommand);
            res.status(200).json({msg:"List is Copied"})
        }catch(err){
            console.log(err)
        }
    }

    createList = async(req,res)=>{
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
    }
    deleteList = async(req,res)=>{
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
    }
}