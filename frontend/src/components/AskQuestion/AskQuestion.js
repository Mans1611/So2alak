import React, { useContext, useEffect, useRef, useState } from 'react'
import './askquestion.scss';
import axios from 'axios';
import ImageIcon from '@mui/icons-material/Image';
import { AppState } from '../../App';
import { useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

const AskQuestion = ({isAnswer,questionDetails,setQuestions}) => {
    
    // called states from context.
    const {sidebarSelected,studentCourses,stundetInfo,setShowNotification} = useContext(AppState);
    
    // states:
    const [question,setQuestion]=useState('');
    const [imgPreview,setImgPrev] = useState(null);
    const [file,setFile] = useState(null);
    const [post,setPost] = useState('')
    // refs:
    const questionInput = useRef(null);
    const questionWrapper = useRef(null);
    
    const {course_code} = useParams();

    const detectLang = (post)=>{
    // this to detect the first letetr of the question if its:
    // if it in english the input will be -> left to right (ltr).
    // if it in arabic the input will be ->  right to left (rtl). 
    if (post.trim()!=='') 
        if(!post[0].match(/^[A-Za-z0-9]$/))
            questionInput.current.style.direction = 'rtl'
        else{
            questionInput.current.style.direction = 'ltr'
        }
   }
   const handleImageUpload = (event)=>{
    setFile(event.target.files[0]);
    
    if (file){
        if (imgPreview){
            questionInput.current.style.borderTopLeftRadius = '0px'
            questionInput.current.style.borderTopRightRadius = '0px'
        }
        const reader = new FileReader()
        reader.onload = (e)=>{
            setImgPrev(e.target.result);
        }
        reader.readAsDataURL(file)
    }}

   const handlePost = async()=>{
    setPost(questionInput.current.innerHTML.replace(/'/g, "\''"))
       let form = {
            'username' : stundetInfo.username,
            'student_id' : stundetInfo.student_id,
            'question' : post,
            'image' : file,
            'course_id' : course_code?course_code : 'CSE471'
       }
       let res = null;
       if(isAnswer){
        //answer, ans_username, student_id, question_id
            form = {
                'ans_username':stundetInfo.username,
                'answer': post,
                'student_id' : stundetInfo.student_id,
                'question_id' : questionDetails.question_id
            }
            res = await axios.post(`${process.env.REACT_APP_API_URL}/post/createAnswer`,form)
        }else{
            res = await axios.post(`${process.env.REACT_APP_API_URL}/post/createQuestion`,form,{
               "headers":{
                   'Content-Type': 'multipart/form-data'
                }
            })
        }
        if (res?.status ===201){
            questionInput.current.innerHTML = '';
            questionInput.current.innerText = 'Answer to Question';
            setPost(null)
            if (res.data.badge){
                setShowNotification(true)
                setTimeout(()=>{
                    setShowNotification(false)
                },3000);
            }
        }
}
   
    const clearPlaceholder = ()=>{
        questionWrapper.current.style.height = 'fit-content'
        if(question.trim() ==='')
            questionInput.current.innerHTML= '';
    }
    const HandleInput = ()=>{
        setPost(questionInput.current.innerHTML)
    }
    useEffect(()=>{
        questionInput.current.innerText = (question==='' && isAnswer) ? `Answer to ${questionDetails.q_username}'s Question`:question === '' && `Ask Question`

    },[])
   return (
    <div className={`askQuestion-container ${isAnswer&& 'post-answer'}`}>
        <div ref={questionWrapper} className="askQuestion-wrapeer">
            {
                imgPreview &&
                <img  className='img-preview' src={imgPreview} alt="" srcset="" />
            }
            <div contentEditable = {true}
            slot='rte'
            ref={questionInput}
            onFocus={clearPlaceholder}
            onInput={HandleInput}
            className='askQuestion-content'>
            </div>
            <div className="down-options">
                <div className="files-wrapper">
                    <input onChange={handleImageUpload} type="file" name="img" id="img-uploader" />
                    <label className='img-label' htmlFor='img-uploader'>
                        <ImageIcon/>
                    </label>
                </div>
                {
                    !isAnswer && 
                    <div className="course-selection">
                        <select defaultValue={course_code}>
                            {studentCourses.map(course=><option key={course.course_id} value={course.course_id}>{course.course_name}</option>)}
                        </select>
                    </div>
                }
            </div>
            <button onClick={handlePost} disabled={questionInput.current?.innerHTML===''}>
                <SendIcon/>
            </button>
        </div>
       
    </div>
  )
}

export default AskQuestion