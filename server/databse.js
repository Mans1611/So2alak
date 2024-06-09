import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv'
import fs from 'fs'

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
    const sqlCommands = fs.readFileSync('./migrations/sqls/20231011213332-students-up.sql').toString();
    await con.query(sqlCommands);
    con.release()
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