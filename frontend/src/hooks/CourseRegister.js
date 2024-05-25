import axios from "axios";
import { useContext } from "react";
import { AppState } from "../App";
import { useNavigate } from "react-router-dom";

export const CourseRegister = async(stundetInfo,user_courses,isTeacher)=>{
        if (user_courses.length === 0) return; // if no courses is selected no request send to backend.
        try {
            // 'result' is assigned a value but never used
            let result;
            if (isTeacher){
                //const {teacher_id,courses,teacher_name} = req.body;
                result = await axios.post(`${process.env.REACT_APP_API_URL}/teacher/registercourses`,{
                    courses:user_courses,
                    teacher_id:stundetInfo?.user_id,
                    teacher_name:stundetInfo?.username
                });
            }else{
                result = await axios.post(`${process.env.REACT_APP_API_URL}/person/registercourse`,{
                    user_courses,
                    student_id:stundetInfo?.student_id,
                    username:stundetInfo?.username
                });
            }
        if(result?.status == 201){
            return 201;
        }
    } catch (error) {
        console.log(error)
        if (error.response.status === 400) console.log("Error");
    }
}