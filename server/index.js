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
import { S3Client,CreateBucketCommand,PutObjectCommand,CreateMultipartUploadCommand } from '@aws-sdk/client-s3'; 

import B2 from 'backblaze-b2';

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
const b2 = new B2({
    applicationKeyId:process.env.BUCKET_KEY_ID,
    applicationKey:process.env.BUCKET_APPLICATION_KEY
})

app.listen(port,async ()=>{
    console.log(`http://localhost:${port}`);
    try{
        // await b2.authorize();
        // const url = await b2.getUploadUrl({
        //     bucketId: process.env.BUCKET_ID
        // });  
        // console.log(url.data.authorizationToken)
        // await b2.uploadFile({
        //     uploadAuthToken: url.data.authorizationToken,
        //     fileName:"mans",
        //     data:"mans is an idiot",
        //     uploadUrl:url.data.uploadUrl
        // })

    }catch(err){
        console.log(err)
    }

})

