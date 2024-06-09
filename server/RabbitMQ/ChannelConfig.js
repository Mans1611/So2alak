import RabbitMQ from 'amqplib'
export const ConnectToChannel = async()=>{
    try{
        const connection = await RabbitMQ.connect(process.env.RABBITQ_HOST);
        const channel = await connection.createChannel();
        console.log("channel is created");
        return channel;
    }catch(err){
        console.log(err);
    }
}
