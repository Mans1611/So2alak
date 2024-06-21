import React, { useContext, useState } from 'react'
import { AppState } from '../../App';
import { Link } from 'react-router-dom';
import SmallProfile from '../SmallProfile/SmallProfile';

const QuestionDetails = ({question}) => {
    const [showProfile,setShowProfie] = useState(false);
    const {setSideBarSelected} = useContext(AppState);

    const handleProfile = (show)=>{
        if (show) setShowProfie(true);
        else{setShowProfie(false)}
    }
    const handleNav = (e)=>{
        e.stopPropagation()
        setSideBarSelected(question.course_id);
    }
  return (
    <div className="question-details">
                by <Link
                onMouseLeave={()=>handleProfile(false)} 
                onMouseOver={()=>handleProfile(true)} 
                onClick={(e)=>e.stopPropagation()}
                to={`/main/profile/?username=${question?.q_username?.replace(" ","")}&student_id=${question.q_user_id}`}> 
                {question.q_username}</Link> related to &nbsp; 
                <Link onClick={handleNav} 
                    to={`/main/${question.course_id}`}>
                    {question.course_name}
                    </Link>
                {showProfile &&
                <SmallProfile
                username = {question.q_username}
                handleProfile = {handleProfile}
                setShowProfie={setShowProfie}/>}
            </div>
  )
}

export default QuestionDetails