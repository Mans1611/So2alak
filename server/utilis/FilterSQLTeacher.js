export const FilterSQLTeacher = (filter='all',id,username)=>{
    let sqlCommand;
    switch(filter){
        case 'all'  : 
            sqlCommand = `
            SELECT * FROM questions AS q
            LEFT JOIN (
                SELECT * FROM answers  
                ORDER BY ans_verified DESC, ans_upvotes DESC , ans_time DESC
            ) AS ans ON ans.q_id = q.question_id
            LEFT JOIN (SELECT course_name,course_id FROM courses) AS cor ON cor.course_id = q.course_id
            INNER JOIN teaching ON teaching.teacher_name = '${username}' AND cor.course_id = teaching.course_id
            ORDER BY q.q_time DESC , ans_verified DESC , ans_upvotes DESC; `;
            return sqlCommand
        case 'verified':
            sqlCommand = `SELECT * FROM questions AS q
            LEFT JOIN (
                SELECT * FROM answers  
                ORDER BY ans_verified DESC, ans_upvotes DESC , ans_time DESC
            ) AS ans ON ans.q_id = q.question_id
            LEFT JOIN (SELECT course_name,course_id FROM courses) AS cor ON cor.course_id = q.course_id
            INNER JOIN teaching ON teaching.teacher_name = '${username}' AND cor.course_id = teaching.course_id
            LEFT JOIN activity_log as al ON al.question_id = q.question_id
            WHERE ans.ans_verified = true
            ORDER BY q.q_time DESC , ans_verified DESC , ans_upvotes DESC; ` 
            return sqlCommand
        case 'unsolved':
            sqlCommand = `SELECT * FROM questions AS q
            LEFT JOIN answers AS ans ON ans.q_id = q.question_id
            LEFT JOIN (SELECT course_name,course_id FROM courses) AS cor ON cor.course_id = q.course_id
            INNER JOIN teaching ON teaching.teacher_name = '${username}' AND cor.course_id = teaching.course_id
            AND ans.q_id IS NULL
            ORDER BY q.q_time DESC , ans_verified DESC , ans_upvotes DESC; ` 
            return sqlCommand
        case 'popular':
            sqlCommand = `SELECT * FROM questions AS q
            LEFT JOIN answers AS ans ON ans.q_id = q.question_id
            LEFT JOIN (SELECT course_name,course_id FROM courses) AS cor ON cor.course_id = q.course_id
            INNER JOIN teaching ON teaching.teacher_name = '${username}' AND cor.course_id = teaching.course_id
            LEFT JOIN activity_log as al ON al.question_id = q.question_id
           
            ORDER BY q.q_upvotes DESC, ans_verified DESC , ans_upvotes DESC;` 
            return sqlCommand
        default : 
            sqlCommand = `
            SELECT * FROM questions AS q
            LEFT JOIN (
                SELECT * FROM answers  
                ORDER BY ans_verified DESC, ans_upvotes DESC , ans_time DESC
            ) AS ans ON ans.q_id = q.question_id
            LEFT JOIN (SELECT course_name,course_id FROM courses) AS cor ON cor.course_id = q.course_id
            INNER JOIN teaching ON teaching.teacher_name = '${username}' AND cor.course_id = teaching.course_id
            ORDER BY q.q_time DESC , ans_verified DESC , ans_upvotes DESC; `;
            return sqlCommand
    }

}