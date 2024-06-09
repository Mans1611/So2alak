import {createClient} from 'redis'

let redisClient;

if(process.env.REDIS_ENV === 'DEV'){ // this if i was in development mode

    redisClient = createClient({
        host: 'localhost',
        port: 6379,
    })
}else{
    redisClient = createClient({ // here is the cloud version of redis hoisted on the cloud
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: process.env.REDIS_ENDPOINT,
            port: 16801
        }
    })
}

redisClient.on('connect',()=>{
    console.log(`you are connected to redis ${process.env.REDIS_ENV}`);
})
export const intializeRedis = async()=>{
    try{
        await redisClient.connect();
    }catch(err){
        console.log(`can not connected to redis `);
    }
} 

export default redisClient;