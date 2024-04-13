import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './question.scss'
import { Link, useNavigate } from 'react-router-dom';
import audio from '../../assets/soundeffects/pop.wav';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Answer from '../Answer/Answer';
import { AppState } from '../../App';
import { getTime } from '../../utilis/getTime';
import SmallProfile from '../SmallProfile/SmallProfile';
import AskQuestion from '../AskQuestion/AskQuestion';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PostOptions from '../PostOptions/PostOptions';
import { io } from 'socket.io-client';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import axios from 'axios';
import ShareIcon from '@mui/icons-material/Share';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ListOptions from '../ListOptions/ListOptions';
import { useAddToList } from '../../hooks/useAddToList';
const socket = io(process.env.REACT_APP_API_URL);

const Question = ({singleQuestion,question,setQuestion}) => {
    
    
    // states:
    const [helped,setHelp] = useState(question.helped);
    const [helpCount,setHelpCount] = useState(question.q_upvotes)
    const [showProfile,setShowProfie] = useState(false);
    const [showQuesOptions,setShowQuesOptions] = useState(false);
    const [bookMarked,setBookMarked] = useState(false);
    const [showlists,setShowLists] = useState(false)
    const {dark,setSideBarSelected,stundetInfo} = useContext(AppState);

    const nav = useNavigate();
    
    
    const handleHelp = async (e)=>{
        e.stopPropagation();
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
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/post/upvoteQuestion/${question.question_id}`,{
            student_id:stundetInfo.student_id,
            course_id:question.course_id,
            helped:!helped
        })
    }
    // refs
    const circle = useRef(null);
    const questionContent = useRef(null);
    const stoplimit = useRef(null);
    const stoplimit2 = useRef(null);
    const questionText = useRef(null);

    setTimeout(()=>{
        if (stoplimit.current && stoplimit2.current){
            stoplimit.current.style.height = questionContent.current.offsetHeight + 'px'
            stoplimit2.current.style.height = questionContent.current.offsetHeight + 'px'
        }
    },0)

    let img = null;
    if (question.data){
        img = `data:${question.mimtype};base64,${question.data}`;
    }
    const handleProfile = (show)=>{
        if (show) setShowProfie(true);
        else{setShowProfie(false)}
    }
    const showFullQuestion = ()=>{
        nav(`/main/question/${question.question_id}`)
    }
    const handleNav = (e)=>{
        e.stopPropagation()
        setSideBarSelected(question.course_id);
    }
    useEffect(()=>{
        questionText.current.innerHTML = question?.question
    },[])
    useEffect(()=>{
        if (socket.connected){
            socket.on('question-change',(data)=>{
                if (data && singleQuestion){
                    setQuestion(state=>({
                        ...state,
                        answers:[data,...state.answers]
                    }))
                }
            })
        }
    },[socket]);

    const handleQuestionOptions = (e)=>{
        e.stopPropagation();
        setShowQuesOptions(state=>!state)
    }
    const AddToList = async(e)=>{
        e.stopPropagation();
        setBookMarked(state=>!state)
        useAddToList(stundetInfo,question,bookMarked);
    }
    const showListsModal = (e)=>{
        e.stopPropagation();
        setShowLists(true);
    }

  return (
    <div onClick={showFullQuestion} className={`question ${dark && 'dark'}`}>
        <div className="question-details">
            by <Link 
            onMouseLeave={()=>handleProfile(false)} 
            onMouseOver={()=>handleProfile(true)} 
            onClick={(e)=>e.stopPropagation()}
            to={`/main/profile/${question?.q_username?.replace(" ","")}`}> 
            {question.q_username}</Link> related to 
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
                    <p ref={questionText}></p>
                    <div className="time">asked {getTime(question.q_time)}</div>
                </div>
                <div className='downQuestion'>
                    {
                        bookMarked?<BookmarkIcon onClick={AddToList} className='post-icons'/> : 
                        <BookmarkBorderIcon onClick={AddToList} className='post-icons'/>
                    }
                    <div className="addList-btn">
                        <PlaylistAddIcon onClick={showListsModal} style={{fontSize:'30px'}} className='post-icons'/>
                        {
                            showlists&&
                            <ListOptions question={question}/>
                        }
                    </div>
                    <ShareIcon className='post-icons'/>
                </div>
            </div>
            <div className="options">
                <MoreVertIcon onClick = {handleQuestionOptions} className='options'/> 
                {showQuesOptions &&  <PostOptions/>}
            </div>
        </div>
        {/* the condition below will just render a single answer if it was in any page like 
            - FeedPage or coursePage*/}
        {!singleQuestion&&question?.answers?.length>0 &&<Answer answer = {question.answers[0]}/>}
        
        {singleQuestion &&  <AskQuestion questionDetails={question} isAnswer={true}/>}
        {/*  While if i was in the question page, i need to show all answers of the question*/}
        {singleQuestion&&
        question.answers?.map((ans,key)=>
            <Answer answer = {ans} key={key}/>) }
    </div>
  )
}




export default Question