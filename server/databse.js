import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv'


dotenv.config();

const {Host,DataBase,User,Pass} = process.env;

let client = new Pool({
    driver : 'pg',
    user : process.env.User,
    host:process.env.Host,
    database:process.env.DataBase,
    port:process.env.Port_DB,
    password:process.env.Pass
})


export default client;