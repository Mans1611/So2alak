import client from "../databse.js"

const defaultCourses = async(level,department,sub_department)=>{
    let sqlCommand, response;
    const con = await client.connect()
    if (level === 'Somophore'){
        console.log("passed")
        sqlCommand = 
        `SELECT c.course_id,c.course_name FROM courses AS c, sub_departments AS sd 
        WHERE c.course_department = sd.department_id
        AND sd.belongs_to = '${department}' AND c.course_level = 'Somophore';`
        response = await con.query(sqlCommand);
        con.release();
        return response.rows;
    }
}

export default defaultCourses;