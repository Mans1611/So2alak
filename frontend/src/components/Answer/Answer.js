import React, { useContext, useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react'
import '../Question/question.scss';
import './answer.scss';
import { Link, useParams } from 'react-router-dom';
import { getTime } from '../../utilis/getTime';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import verified from '../../assets/badges/verified_ans.png';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import { AppState } from '../../App';
import { io } from 'socket.io-client';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import axios from 'axios';
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

const socket = io(process.env.REACT_APP_API_URL);
const Answer = ({answer}) => {
    
    const [answerState,dispatch] = useReducer(reducer,intialState);
    const {isTeacher} = useContext(AppState); 
    
    const handleUpVotes = (e)=>{
        e.stopPropagation();
        dispatch({type:'upvote'})
    }
    const handleDownVotes = (e)=>{
        e.stopPropagation();
        dispatch({type:'downvote'})
    }
    const navToProfile = (e)=> e.stopPropagation(); 
    const answerText = useRef(null);
    const [isVerified,setIsVerified] = useState(answer.ans_verified);

    
    const handleVerify = async()=>{
        if(isTeacher){
            try{
                const res = await axios.put(`${process.env.REACT_APP_API_URL}/post/verifyAnswer/${answer.answer_id}`)
                if(res.status === 201){
                    setIsVerified(true);
                }
            }catch(err){
                console.log(err)
        }
        }
    }
    const {username} = useParams();
    if(answer.answer){
        setTimeout(()=>{
            answerText.current.innerHTML = answer.answer
        },0)
       
        return (
            <div className='answer question'>
                <div className="question-details">
                    by <Link onClick={navToProfile} to={`/main/profile/${answer?.ans_username?.replace(" ","")}`}>{answer?.ans_username? answer.ans_username:'' }</Link> 
                </div>
                <div className="flex">
                    <div className="verified">
                        { isVerified && <img className='verified_ans' src={verified}/>}
                        {isTeacher && !isVerified  && 
                        <div className='verified_ans '>
                            <DoneOutlineIcon onClick={handleVerify}  className='verify_btn'/>
                        </div>}
                    </div>
                    <div className='question-wrapper'>
                        <div className={`question-content ${username === answer.ans_username ? 'active':''}`}>
                        {answer.ans_img_url && <img src={answer.img_url} className='ques_img' />}
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
}

export default Answer