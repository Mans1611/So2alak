import axios from "axios"



const FetchPost = async (course)=>{
    let data = null;
    data = await axios.get(course)
    return data
}

export default FetchPost;