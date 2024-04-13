import React, { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react'
import '../Question/question.scss';
import './answer.scss';
import { Link } from 'react-router-dom';
import { getTime } from '../../utilis/getTime';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import verified from '../../assets/badges/verified_ans.png';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
const intialState = {
    upvote:false,
    downvote:false,
    upvote_count:0,
    downvote_count:0
}

const reducer = (state,{type})=>{
    switch(type){
        case 'upvote' : 
        return {
            downvote:false,
            upvote:!state.upvote,
            upvote_count : state.upvote ?  state.upvote_count - 1 : state.upvote_count + 1 ,
            downvote_count : state.downvote ?  state.downvote_count - 1 : state.downvote_count 
        }
        case 'downvote' : 
        return {
            upvote:false,
            downvote:!state.downvote,
            upvote_count : state.upvote ?  state.upvote_count - 1 : state.upvote_count ,
            downvote_count : state.downvote ?  state.downvote_count - 1 : state.downvote_count + 1 
        }
        default : 
            return {
                ...intialState
            }
    }
}

const Answer = ({answer}) => {
    const [helped,setHelped] = useState(false);
    const [count,setCount]=useState(0)
    const [answerState,dispatch] = useReducer(reducer,intialState);

    const handleUpVotes = (e)=>{
        e.stopPropagation();
        dispatch({type:'upvote'})
    }
    const handleDownVotes = (e)=>{
        e.stopPropagation();
        dispatch({type:'downvote'})
    }
    const handleHelper = (e)=>{
        e.stopPropagation();
        setHelped(help=>!help);
        if(helped){
            setCount(count=>count-1);
            return
        }
        setCount(count=>count+1);
    }
    const navToProfile = (e)=> e.stopPropagation(); 
    const answerText = useRef(null)
    useEffect(()=>{
        answerText.current.innerHTML = answer.answer
        
    },[answer])
  return (
    <div className='answer question'>
         <div className="question-details">
            by <Link onClick={navToProfile} to={`/main/profile/${answer?.ans_username?.replace(" ","")}`}>{answer?.ans_username? answer.ans_username:'idiot' }</Link> 
        </div>
        <div className="flex">
            <div className="verified">
                {answer.ans_verified && <img className='verified_ans' src={verified}/>}
            </div>
            <div className='question-wrapper'>
                <div className="question-content">
                    <p ref={answerText}></p>
                    <div className="time">answered {getTime(answer.ans_time)}</div>
                </div>
                <div className='downQuestion'>
                    <div className="icon-wrapper">
                        {
                            answerState.upvote?
                            <ThumbUpIcon onClick={handleUpVotes} className='post-icons'/>:    
                            <ThumbUpOutlinedIcon onClick={handleUpVotes} className='post-icons'/>
                        }
                        {answerState.upvote_count}
                    </div>
                    <div className="icon-wrapper">
                        {
                            answerState.downvote? 
                            <ThumbDownIcon onClick={handleDownVotes} className='post-icons'/>:
                            <ThumbDownOffAltOutlinedIcon onClick={handleDownVotes} className='post-icons'/>
                        }
                        {answerState.downvote_count}
                    </div>
                </div>
            </div>
            </div>
    </div>
  )
}

export default Answer