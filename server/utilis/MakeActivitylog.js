export const MakeActivity = async (student_id,activity_type,q_id,points,con,ans_id,course_id)=>{
    try{
        if (ans_id === undefined){
            ans_id = null;
        }
        let sqlCommand =  null
        if (course_id === undefined){
            sqlCommand =  `SELECT course_id FROM questions WHERE question_id = ${q_id};`
            const {rows} = await con.query(sqlCommand);
            course_id = rows[0].course_id
        }
        
        sqlCommand =  `
            INSERT INTO activity_log (student_id,question_id,ans_id,activity_type,points,course_id)
            VALUES('${student_id}',${q_id},${ans_id},'${activity_type}',${points},'${course_id}');
            UPDATE students 
            SET points = points+${points}
            WHERE student_id = '${student_id}';`
        await con.query(sqlCommand);
    }catch(error){
        console.log(error);
    }
}