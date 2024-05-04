import axios from "axios"

export const useFetchData = async(api)=>{
    try{
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/${api}`);
        return result
    }catch(err){
        console.log(err)
    }
}