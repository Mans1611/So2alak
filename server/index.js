import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import person from './routers/Person.js';
import client from './databse.js';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/person',person);
dotenv.config();    // configure environement varables

const port =  process.env.PORT || 6000;

app.listen(port,async ()=>{
    console.log(`http://localhost:${port}`)
})

