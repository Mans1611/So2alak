import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './question.scss'
import { useNavigate } from 'react-router-dom';
import Answer from '../Answer/Answer';
import { AppState } from '../../App';
import { getTime } from '../../utilis/getTime';
import AskQuestion from '../AskQuestion/AskQuestion';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PostOptions from '../PostOptions/PostOptions';
import { io } from 'socket.io-client';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ListOptions from '../ListOptions/ListOptions';
import { useAddToList } from '../../hooks/useAddToList';
import Portal from '../../Portal/Portal';
import QuestionModal from '../../Portal/QuestionModal/QuestionModal';
import QuestionDetails from './QuestionDetails';
import HelpCircle from './HelpCircle';
const socket = io(process.env.REACT_APP_API_URL);

const Question = ({singleQuestion,question,setQuestion}) => {
    const nav = useNavigate();
    
    const {dark,stundetInfo} = useContext(AppState);
    
    // states:
    const [showQuesOptions,setShowQuesOptions] = useState(false);
    const [bookMarked,setBookMarked] = useState(false);
    const [showlists,setShowLists] = useState(false) 
    const [showQuestionModal,setShowQuestionModal] = useState(false);
    
    const [deletedQuestion,setDeletedQuestion] = useState(false)
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
    
    const showFullQuestion = ()=>{
        if (window.location.href.includes('/question')) return 
        if (!question.img_url){
            nav(`/main/question/${question.question_id}`)
        }
        else{
            setShowQuestionModal(true);
        }
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
    useLayoutEffect(()=>{
        const navbar = document.getElementById('navbar');
        if (showQuestionModal){
            navbar.style.zIndex = 0;
        }else{
            navbar.style.zIndex = 10;
        }
    },[showQuestionModal]);
    if(deletedQuestion){
        return (<div className='question'>
            <div className="flex">
            <div className='question-wrapper deleted'>
                This Question os Deleted
            </div>
            </div>
        </div>)
    }
  return (
    <>
        <div onClick={showFullQuestion} className={`question ${dark && 'dark'}`}>
            <QuestionDetails question={question}/>
            
            <div className="flex">
                <HelpCircle question={question} circle={circle} stoplimit={stoplimit}/>
                <div className='question-wrapper'>
                    <div ref={questionContent} className="question-content">
                        {question.img_url && <img src={question.img_url} className='ques_img' />}
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
                                <ListOptions 
                                     
                                    question={question}/>
                            }
                        </div>
                        <ShareIcon className='post-icons'/>
                    </div>
                </div>
                <div className="options">
                    <MoreVertIcon onClick = {handleQuestionOptions} className='options'/> 
                    {showQuesOptions &&  <PostOptions 
                                question= {question}
                                setDeletedQuestion={setDeletedQuestion}/>}
                </div>
            </div>
            {/* the condition below will just render a single answer if it was in any page like 
                - FeedPage or coursePage*/}
            {!singleQuestion&&question?.answers?.length>0 && <Answer answer = {question.answers[0]}/>}
            {/* for a the list page questions */}
            {singleQuestion && <AskQuestion questionDetails={question} isAnswer={true}/>}
            {/*  While if i was in the question page, i need to show all answers of the question*/}
            {singleQuestion&&question.answers.map((ans,key)=> <Answer answer = {ans} key={key}/>) }
        </div>
        {showQuestionModal&&<Portal children={<QuestionModal setShowQuestionModal={setShowQuestionModal} question={question}/>}/>}
    </>
  )
}




export default Question