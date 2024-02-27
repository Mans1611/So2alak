import React, { useRef, useState } from 'react'
import './askquestion.scss';
import axios from 'axios';
import ImageIcon from '@mui/icons-material/Image';
const AskQuestion = () => {
    const [question,setQuestion]=useState('');
    const questionInput = useRef(null);
    const [imgPreview,setImgPrev] = useState(null);
    const [file,setFile] = useState(null);
   const detectLang = (question)=>{
    // this to detect the first letetr of the question if its:
    // if it in english the input will be -> left to right (ltr).
    // if it in arabic the input will be ->  right to left (rtl). 
    if (question.trim()!=='') 
        if(!question[0].match(/^[A-Za-z0-9]$/))
            questionInput.current.style.direction = 'rtl'
        else{
            questionInput.current.style.direction = 'ltr'
        }
   }
   const handleImageUpload = (event)=>{
    setFile( event.target.files[0]);
    if (file){
        if (imgPreview){
            questionInput.current.style.borderTopLeftRadius = '0px'
            questionInput.current.style.borderTopRightRadius = '0px'
        }
        const reader = new FileReader();
        
        reader.onload = (e)=>{
            setImgPrev(e.target.result);
        }
        reader.readAsDataURL(file)
    }
   }
   const handlePost = async()=>{
       let form = {
            'username' : 'Ahmed',
            'student_id' : '1901567',
            'question' : question,
            'image' : file,
            'course_id' : 'CSE471'
       }
       
        const res = await axios.post('http://localhost:8000/post/createQuestion',form,{
            "headers":{
                'Content-Type': 'multipart/form-data'
            }
        }
   )}
   return (
    <div className='askQuestion-container'>
        <div className="askQuestion-wrapeer">
                {
                    imgPreview &&
                    <img  className='img-preview' src={imgPreview} alt="" srcset="" />
                }
            <textarea ref={questionInput} onChange={(e)=>{detectLang(e.target.value);setQuestion(e.target.value);}} placeholder='Ask Your Question' type="text" />
            <div className="files-wrapper">
                <input onChange={handleImageUpload} type="file" name="img" id="img-uploader" />
                <label className='img-label' for='img-uploader'>
                    <ImageIcon/>
                </label>
            </div>
            <button onClick={handlePost} disabled={question.trim()==''}>Ask</button>
        </div>
    </div>
  )
}

export default AskQuestion