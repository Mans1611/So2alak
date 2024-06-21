import RabbitMQ from 'amqplib'
export const ConnectToChannel = async()=>{
    try{
        const connection = await RabbitMQ.connect(process.env.RABBITQ_HOST);
        const channel = await connection.createChannel();
        console.log("channel is created");
        connection.on('close', () => {
            console.error('Connection to RabbitMQ closed');
            process.exit(1);
          });
        channel.on('close', () => {
        console.error('Channel closed');
        process.exit(1);
        });
        return channel;
    }catch(err){
        console.log(err);
    }
}
