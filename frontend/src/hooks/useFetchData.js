import axios from "axios"
import { useEffect, useState } from "react";

export const useFetchData = async(api)=>{
    
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const result = await axios.get(`${process.env.REACT_APP_API_URL}/${api}`);
                if(result.status === 200)
                    setData(result.data);
                setLoading(false);
                return {data,loading}
            }catch(err){
                console.log(err)
            }
        }
        
        fetchData();
    })
    return [data,loading];
    
}