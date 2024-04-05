import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import person from './routers/Person.js';
import course from './routers/Courses.js';
import bodyParser from 'body-parser';
import post from './routers/Post.js';
import {spawn} from 'child_process';
const pythonFiles = spawn('python',['utilis/mans.py',4,3]);
import teacher from './routers/Teachers.js';

import b2 from './Bucket/Bucket.js';
dotenv.config();    // configure environement varables


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


// Router middlewares
app.use('/person',person);
app.use('/post',post);
app.use('/course',course);
app.use('/teacher',teacher);

const port =  process.env.PORT || 6000;

app.listen(port,async ()=>{
    console.log(`http://localhost:${port}`);
    try{
        await b2.authorize()
    }catch(err){
        console.log(err)
    }
})

