import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import person from './routers/Person.js';
import course from './routers/Courses.js';
import bodyParser from 'body-parser';
import post from './routers/Post.js';
import {Server} from 'socket.io';
import teacher from './routers/Teachers.js';
import compression from 'compression';
import http from 'http'
import lists from './routers/Lists.js';
import { intializeRedis } from './redis.js';
import { ConnectToChannel } from './RabbitMQ/ChannelConfig.js';


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

app.use(compression({
        level: 1, 
        threshold: 0, 
        filter: (req, res) => {
          // Custom filter function to decide whether to compress a response
          if (req.headers['x-no-compression']) {
            // Don't compress responses with this request header
            return false;
          }
          return compression.filter(req, res);
        }
      
}))

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
    
})

export const channel = await ConnectToChannel(); // creating channel for message queue and send message to othe microservives.
await intializeRedis(); // intiating the redis instance with the cloud.

server.listen(port,async ()=>{
    console.log(`http://localhost:${port}`);
    try{
    }catch(err){
        console.log(err)
    }
})

