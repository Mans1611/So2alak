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
        user : process.env.POSTGRES_USER,
        host:process.env.POSTGRES_HOST,
        database:process.env.POSTGRES_DB,
        port:process.env.POSTGRES_PORT || 5432, // 5432
        password:process.env.POSTGRES_PASSWORD
    })
}

let shards = {
  freshmen_shard:new Pool({
    driver:'pg',
    user:process.env.POSTGRES_USER,
    host : process.env.POSTGRES_HOST_FRESHMEN,//container name
    database:process.env.POSTGRES_DB,
    port:process.env.POSTGRES_PORT || 5432,
    password:process.env.POSTGRES_PASSWORD,  

  }),
  senior_shard:new Pool({
    driver:'pg',
    user:process.env.POSTGRES_USER,
    host :process.env.POSTGRES_HOST_SENIOR ,//container name
    database:process.env.POSTGRES_DB,
    port:process.env.POSTGRES_PORT || 5433,
    password:process.env.POSTGRES_PASSWORD,  
  })
}

const selectShard = (level)=> level === 'freshmen'? shards.freshmen_shard : shards.senior_shard

const executeQuery = async(query,params=[],level='freshmen')=>{
  const shard = selectShard(level);
  let con;
  try{
    con = await shard.connect();
    return (await con.query(query,params)).rows
    
  }catch(err){
    console.log(err)
  }
  finally{
    con.release()
  }
}
export default client;