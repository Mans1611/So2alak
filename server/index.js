import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import person from './routers/Person.js';
import course from './routers/Courses.js';
import bodyParser from 'body-parser';
import post from './routers/Post.js';



const app = express();

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());



// Router middlewares
app.use('/person',person);
app.use('/post',post);
app.use('/course',course);

dotenv.config();    // configure environement varables

const port =  process.env.PORT || 6000;

app.listen(port,async ()=>{
    console.log(`http://localhost:${port}`)
})

