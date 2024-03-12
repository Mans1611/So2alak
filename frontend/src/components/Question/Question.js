import React, { useContext, useRef, useState } from 'react'
import './question.scss'
import { Link } from 'react-router-dom';
import audio from '../../assets/soundeffects/pop.wav';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Answer from '../Answer/Answer';
import { AppState } from '../../App';
import { getTime } from '../../utilis/getTime';
import SmallProfile from '../SmallProfile/SmallProfile';

const Question = ({question}) => {
    console.log((Date.now() - new Date(question.q_time)) /  (1000*24 *60*60))

    const [helped,setHelp] = useState(false);
    const circle = useRef(null);
    const [helpCount,setHelpCount] = useState(question.q_upvotes)
    const [showProfile,setShowProfie] = useState(false);
    const {dark} = useContext(AppState);

    const handleHelp = ()=>{
        const pop = new Audio(audio); 
        if(helped && circle.current){
            circle.current.style.transform = 'rotate(0deg)';
            setHelp(false)
            setHelpCount(count=>count-1)
        }
        else {
            pop.play();
            if (circle.current){
                circle.current.style.transform = 'rotate(180deg)';
                setHelp(true)
                setHelpCount(count=>count+1)
            }

        }
    
    }
    const questionContent = useRef(null);
    const stoplimit = useRef(null);
    const stoplimit2 = useRef(null);
    setTimeout(()=>{
        if (stoplimit.current && stoplimit2.current){
            stoplimit.current.style.height = questionContent.current.offsetHeight + 'px'
            stoplimit2.current.style.height = questionContent.current.offsetHeight + 'px'
        }
    },0)
    let img = null;
    if (question.data){
        img = `data:${question.mimtype};base64,${question.data}`
    }
    const handleProfile = (show)=>{
        if (show) setShowProfie(true);
        else{setShowProfie(false)}
    }

  return (
    <div className={`question ${dark && 'dark'}`}>
        <Link>
        </Link>
        <div className="question-details">
            by <Link 
            onMouseLeave={()=>handleProfile(false)} 
            onMouseOver={()=>handleProfile(true)} 
            to={`/profile/${question.q_username.replace(" ","")}`}> 
            {question.q_username}</Link> related to <Link>DataBase</Link>
            {showProfile &&
            <SmallProfile 
             handleProfile = {handleProfile}
             setShowProfie={setShowProfie}/>}
        </div>
        <div className="flex">
            <div ref = {stoplimit} className={`question-help`}>
                <div className="help-wrapper">
                    <div ref={circle} onClick={handleHelp} className={`circle ${helped?'active':''}`}>
                        {helped? 
                        <RemoveIcon/>
                        :<AddIcon/>}
                    </div>
                    <h3 className='help-counts'>{helpCount}</h3>
                </div>
            </div>
            <div className='question-wrapper'>
                <div ref={questionContent} className="question-content">
                    {question.data && <img src={img} className='ques_img' />}
                    <p> {question.question} </p>
                    <div className="time">asked @ {getTime(question.q_time)}</div>
                </div>
                
            </div>
            
        </div>
        {question?.answers?.length>0 &&
            <Answer answer = {question.answers[0]}/>
        }
    </div>
  )
}

export default Question