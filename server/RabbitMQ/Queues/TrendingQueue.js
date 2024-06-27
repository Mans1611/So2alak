export const TrendingQueue = async(channel,queueName,data)=>{
    try{
        await channel?.assertQueue(queueName, { durable: true });
        channel?.sendToQueue(queueName,
                            Buffer.from(JSON.stringify(data)),
                            { persistent: true });
    }
    catch(err){
        console.log(err)
    }
} 