import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import person from './routers/Person.js';
import course from './routers/Courses.js';
import bodyParser from 'body-parser';
import post from './routers/Post.js';
import {spawn} from 'child_process';
import client from './databse.js';
import postgres from 'postgres';
const pythonFiles = spawn('python',['utilis/mans.py',4,3]);
import fs from 'fs'
import teacher from './routers/Teachers.js';
let pythonData = '';
pythonFiles.stdout.on('data',(data)=>{
   
    pythonData = data.toString();
})


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Router middlewares
app.use('/person',person);
app.use('/post',post);
app.use('/course',course);
app.use('/teacher',teacher);

dotenv.config();    // configure environement varables

const port =  process.env.PORT || 6000;

app.listen(port,async ()=>{
    console.log(`http://localhost:${port}`);
    try{
       

    }catch(err){
        console.log(err)
    }

})
