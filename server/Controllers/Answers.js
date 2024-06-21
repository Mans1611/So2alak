import client from "../databse.js";

export class Answers {
    getQuestionAnswers = async(req,res)=>{
        const {q_id} = req.query;
        let sqlCommand,con;
        try{
            if(!q_id)
                return res.status(400).json({err:"no Q_id is provided"});
            con = await client.connect();
            sqlCommand = `SELECT * FROM answers WHERE q_id = ${q_id};`
            const {rows} = await con.query(sqlCommand);
            return res.status(200).json({data:rows});
        }catch(err){
            console.log(err);
        }finally{
            con.release();
        }
    }
}