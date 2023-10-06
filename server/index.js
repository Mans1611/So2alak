import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

app.use(cors());

dotenv.config();    // configure environement varables

const port =  process.env.PORT || 6000;

app.listen(port,()=>{
    console.log(process.env.PORT)
    console.log(`http://localhost:${port}`)
})

