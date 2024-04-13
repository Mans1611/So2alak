export const CheckBadges = async(student_id,badge_name,course_id)=>{
    let sqlCommand = `SELECT * FROM earned_badges WHERE student_id=${student_id} AND badge_name=${badge_name}`;
        const res = await con.query(sqlCommand);
        if (res.rows.length > 0)
            return false
        else{
            sqlCommand = `INSERT INTO earned_badges (student_id,badge_name,course_id) VALUES
                ('${student_id}','${badge_name}','${course_id?course_id:null}');`
            await con.query(sqlCommand);
            return true;
        }
}