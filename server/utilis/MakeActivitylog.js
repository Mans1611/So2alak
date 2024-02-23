export const MakeActivity = async (student_id,activity_type,q_id,con,ans_id)=>{
    try{
        if (ans_id === undefined)
            ans_id = null;
        let sqlCommand =  `
            INSERT INTO activity_log (student_id,question_id,ans_id,activity_type)
            VALUES('${student_id}',${q_id},${ans_id},'${activity_type}');`
        await con.query(sqlCommand);
    }catch(error){
        console.log("error in activity function");
        console.log(error);
    }
}