import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv'
import { exec } from 'child_process';


dotenv.config();

const {Host,DataBase,User,Pass} = process.env;
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
let client = null ;
if (process.env.env == 'prod'){
  client = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
      require: true,
    },
  });
  try{
    const con = await client.connect();
    await con.query(`
    CREATE TABLE IF NOT EXISTS departments (
      department_id VARCHAR(30) NOT NULL PRIMARY KEY
    );`)
    console.log("connected to cloud")
  }catch(err){
    console.log(err)
  }


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
    console.log("Dev Database");

}


export default client;