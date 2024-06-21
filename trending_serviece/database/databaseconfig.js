
import pkg from 'pg';
import dotenv from "dotenv";
const {Pool} = pkg;
dotenv.config()
let client;

client = new Pool({
    // data base information
    driver : 'pg',
    user : process.env.DATABASE_USER,
    host:process.env.DATABASE_HOST,
    database:process.env.DATABASE_NAME,
    port:process.env.DATABASE_PORT, // 5432
    password:process.env.DATABASE_PASS
})
export default client;

console.log("Dev Database");