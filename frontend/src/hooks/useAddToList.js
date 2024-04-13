import axios from "axios"

export const useAddToList = async(stundetInfo,question,bookMarked,list_id)=>{ 
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/post/addToFavQues`,{
            s_id:stundetInfo.student_id,
            username:stundetInfo.username,
            q_id:question.question_id,
            course_id:question.course_id,
            bookMarked :list_id? false : !bookMarked,
            list_id:list_id?list_id:null
        })
    }catch(err){
        console.log(err)
    }
}