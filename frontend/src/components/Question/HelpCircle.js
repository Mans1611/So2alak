import React, { useContext, useRef, useState } from 'react'
import { AppState } from '../../App'
import axios from 'axios';
import audio from '../../assets/soundeffects/pop.wav';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './helpcount.scss';
const HelpCircle = ({question,stoplimit}) => {
    const {isTeacher,stundetInfo} = useContext(AppState);
    const circle = useRef(null);

    const [helped,setHelp] = useState(question?.helped? question.helped:false);
    const [helpCount,setHelpCount] = useState(question.q_upvotes)
    
    const handleHelp = async (e)=>{

        e.stopPropagation();
        const pop = new Audio(audio); 
        if(helped && circle?.current){
            circle.current.style.transform = 'rotate(0deg)';
            setHelp(false)
            setHelpCount(count=>count-1)
        }
        else {
            pop.play();
            if (circle?.current){
                circle.current.style.transform = 'rotate(180deg)';
                setHelp(true)
                setHelpCount(count=>count+1)
            }
        }
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/post/upvoteQuestion/${question.question_id}`,{
            student_id:stundetInfo.student_id,
            course_id:question.course_id,
            helped:!helped
        })
    }
  return (
    <div ref = {stoplimit} className={`question-help`}>
        <div className="help-wrapper">
        {!isTeacher
        && 
            <div ref={circle} onClick={handleHelp} className={`circle ${helped?'active':''}`}>
                {helped? 
                <RemoveIcon/>
                :<AddIcon/>}
            </div>
        }
            <h3 className='help-counts'>{helpCount}</h3>
        </div>
    </div>
  )
}

export default HelpCircle