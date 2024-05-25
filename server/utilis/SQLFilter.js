export const SQLFilter = (dataType,teacher_id)=>{
    console.log(dataType)
    switch(dataType){
        case 'Total Number Of question':
            return `SELECT T.course_name, count(question_id) AS "total"  FROM teaching AS T,questions Q
                WHERE teacher_id = '${teacher_id}' 
                AND Q.course_id = T.course_id  
                GROUP BY (Q.course_id,T.course_name);`;
        case 'Total Number Of unsolved Questions':
            return `SELECT T.course_name , count(q.question_id) AS total FROM questions AS q
                LEFT JOIN answers AS ans ON ans.q_id = q.question_id
                LEFT JOIN (SELECT course_name,course_id FROM courses) AS cor ON cor.course_id = q.course_id
                INNER JOIN teaching AS T ON T.course_id = q.course_id 
                WHERE T.teacher_id = '${teacher_id}'
                AND ans.q_id IS NULL
                GROUP BY (T.course_id,T.course_name);`
        default : 
            return `SELECT T.course_name, count(question_id) AS "total"  FROM teaching AS T,questions Q
                WHERE teacher_id = '${teacher_id}' 
                AND Q.course_id = T.course_id  
                GROUP BY (Q.course_id,T.course_name);`;
    }
}