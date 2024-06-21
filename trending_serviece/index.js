import express from 'express';
import dotenv from 'dotenv';
import trending from './Routers/TrendingRouter.js';
import { ConnectToChannel } from './RabbitMQ/ChannelConfig.js';
import bodyParser from 'body-parser';

import cors from 'cors'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8001;
app.use(cors());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/trending',trending);
export const channel = await ConnectToChannel();
app.listen(PORT, async()=>{
    console.log('http://localhost:' + PORT );
    
})