import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import person from './routers/Person.js';
import course from './routers/Courses.js';
import bodyParser from 'body-parser';
import post from './routers/Post.js';
import {Server} from 'socket.io';
import teacher from './routers/Teachers.js';
import b2 from './Bucket/Bucket.js';
import http from 'http'
import lists from './routers/Lists.js';
dotenv.config();    // configure environement varables

const app = express();
const server = http.createServer(app)
export const io = new Server(server,{
    cors:{
       origin : process.env.FRONTEND_URL,

   methods : ["GET","POST","PUT","DELETE"],
       allowedHeaders: ["my-custom-header"],
       credentials : true
    }
});


app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


// Router middlewares
app.use('/person',person);
app.use('/post',post);
app.use('/course',course);
app.use('/teacher',teacher);
app.use('/lists',lists);

const port =  process.env.PORT || 6000;
io.on('connection',(socket)=>{
socket.on('idiot',(data)=>{
    })
})
server.listen(port,async ()=>{
    console.log(`http://localhost:${port}`);
    try{
       
    }catch(err){
        console.log(err)
    }
})

