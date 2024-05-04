import multer from "multer";
import client from "../databse.js";
import { Router } from "express";

const course = Router();
const storage = multer.memoryStorage();
const uploader = multer({storage:storage})

course.get('/searchcourse/:searchString',async(req,res)=>{
    let {searchString} = req.params;
    try {
        const con = await client.connect();
        let sqlCommand = `SELECT * FROM courses 
        WHERE course_name ILIKE '%${searchString}%' 
        OR course_id ILIKE '%${searchString}%';`
        const {rows} = await con.query(sqlCommand);
        let courses = rows.map(course=>{
            if (course.course_logo){
                course.data = Buffer.from(course.data).toString('base64')
                return course;
            }
            else{
                return course
            }
        })
        con.release();
        return res.status(200).json({courses})
    } catch (error) {
        console.log(error)
    }
})
course.post('/addcourse',uploader.single('image'),async(req,res)=>{
    // for adding course to the platform.
    
    const {course_name, course_id,course_department,course_level} = req.body;
    let sqlCommand = null
    try{
        const con = await client.connect();
        let result = null;
        if (req.file){
            sqlCommand = `INSERT INTO files (filename,mimtype,data) 
            VALUES ($1,$2,$3) RETURNING id;`
            const { originalname, mimetype, buffer} = req.file;
            result = await con.query(sqlCommand,[originalname,mimetype,buffer])
        }
        if(result){
            sqlCommand = 
            `INSERT INTO courses(course_name,course_id,course_level,course_department,course_logo) 
            VALUES ('${course_name}','${course_id}','${course_level}','${course_department}',${result.rows[0].id});`
        }
        else{
            sqlCommand = 
            `INSERT INTO courses(course_name,course_id,course_level,course_department) 
            VALUES ('${course_name}','${course_id}','${course_level}','${course_department}');`
            }
            await con.query(sqlCommand);
            con.release();
            return res.json({msg:"Done"})
    }catch(err){
        console.log(err)
    }
})
course.get('/getimage',async(req,res)=>{
    const sqlCommand = `select data from files;`
    const con = await client.connect();
    const {rows} =await  con.query(sqlCommand);
    con.release();
    return res.send(Buffer.from(rows[0].data).toString('base64'));

})

course.get('/course_details/:course_id',async(req,res,next)=>{
    const {course_id} = req.params;
    console.log(course_id)
    try{
        let sqlCommand = null;
        let result = {}
        let row = null;

        const con = await client.connect();

        //  this to fetch the teaching staff of that cousrse.
        sqlCommand = `SELECT * FROM teaching 
                        WHERE course_id = '${course_id}';`;
        const {rows} = await con.query(sqlCommand)
        result['teachers'] = rows;

        // getting the total studnets of that course.
        sqlCommand = `SELECT count(*) AS stundets FROM students_courses 
                WHERE course_id = '${course_id}'
                GROUP BY course_id ;`
        const {rows:numberOfStudents} = await con.query(sqlCommand);
        const {rows:courseDetails} = await con.query(`SELECT * FROM courses WHERE course_id ='${course_id}' `)
        result = {...result,...(courseDetails[0]),totalStudents:numberOfStudents[0]?.stundets}
        // getting the top studentes in this course to show them.
        sqlCommand = `SELECT al.student_id,username,sum(al.points) as points,course_id 
                        FROM activity_log as al,students as s
                        WHERE s.student_id = al.student_id
                        AND course_id = '${course_id}'
                        GROUP By course_id, al.student_id,username
                        ORDER BY points DESC 
                        LIMIT 3;`
        const {rows:topStudents} = await con.query(sqlCommand) 
        result = {...result,top3:topStudents}

        res.status(200).json(result)
        con.release()
        next()
    }catch(err){
        console.log(err);
    }
})

export default course;
