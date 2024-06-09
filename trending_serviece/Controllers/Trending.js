import { ConnectToChannel } from "../RabbitMQ/ChannelConfig.js";
import {isValidJSON} from '../utilis/isVailidJSON.js';
import {FilterWords} from '../utilis/FilterWords.js';
import { channel } from "../index.js";
export class Trending{
    getTrendingTopic = async(req,res)=>{
        try{
            if(!channel)
                return res.status(200).json({data:[]})
            await channel.assertQueue('ProcessTrending', { durable: true });
            const msg = await channel.get('ProcessTrending',{noAck:false})
            let trending=[]
            if(msg){
                const stringData = msg.content.toString();
                if(isValidJSON(stringData)){
                    trending = FilterWords(JSON.parse(stringData)?.data);
                }
            }
            channel.ack(msg);  
            await channel.cancel('ProcessTrending')
            res.status(200).json({data:trending});
        }catch(err){
            console.log(err);
            return res.json({data:[]}); 
        }
    }
}
