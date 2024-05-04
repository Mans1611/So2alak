import axios from "axios";
import { useContext } from "react";
import { AppState } from "../App";
import { useNavigate } from "react-router-dom";

export const useCourseRegister = async(stundetInfo,studentCourses)=>{
    
    //const navigate = useNavigate();
    if (studentCourses.length === 0) return; // if no courses is selected no request send to backend.
    try {
        // 'result' is assigned a value but never used
        const result = await axios.post(`${process.env.REACT_APP_API_URL}/person/registercourse`,{
            studentCourses,
            student_id:stundetInfo?.student_id,
            username:stundetInfo?.username
        }
        );
        if(result?.status == 201){
            //navigate("/main/feedpage");

        }
    } catch (error) {
        console.log(error)
        if (error.response.status === 400) console.log("Error");
    }
      
}