import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv'


dotenv.config();

const {Host,DataBase,User,Pass} = process.env;

let client = null ;
if (process.env.env === 'prod'){
    client = new Pool({
        user:process.env.Prod_User ,
        password: process.env.Prod_Pass,
        host: process.env.Prod_Host,
        database:  process.env.Prod_database,
        ssl: true,
        uid:process.env.Prod_UID
    })
}else{
    client = new Pool({
        // data base information
        driver : 'pg',
        user : process.env.User,
        host:process.env.Host,
        database:process.env.DataBase,
        port:process.env.Port_DB, // 5432
        password:process.env.Pass
    })
}


export default client;