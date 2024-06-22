import React, { useContext, useEffect, useState } from 'react'
import './listpage.scss'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Question from '../../components/Question/Question';
import pdf from '../../assets/pdf.png'
import {PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import QuestionsPDF from '../../components/PDFQuestions/PDFQuestions';
import { AppState } from '../../App';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const ListPage = () => {
    const {student_id,list_id} = useParams();
    const [questions,setQuestions] = useState([]);
    const [listDetails,setListDetails] = useState({});
    const {stundetInfo}= useContext(AppState);
    useEffect(()=>{
      const incrementVisit = async()=>{
        try{
            const {data,status} = await axios.put(`${process.env.REACT_APP_API_URL}/lists/editlist`,{
              change : 'INCREMENT_VIEW',
              list_id
            })
        
          }catch(err){
          console.log(err)
        }
      }
      if(student_id !== stundetInfo.student_id)  
        incrementVisit()
      
     
    },[])
    useEffect(()=>{
        const fetchList = async ()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/lists/${list_id}`)
                if (res.status===200){
                  setQuestions(res.data.data);
                  setListDetails(res.data.list);
                }
            }catch(err){
            console.log(err);   
            }
        }
        fetchList();
    },[])
    const handleCopyList = async()=>{
        try{
          const {data,status} = await axios.post(`${process.env.REACT_APP_API_URL}/lists/copylist`,{
            list_id,
            recieveStudent : {
              student_id:stundetInfo.student_id,
              username:stundetInfo.username
            },
            originalStudent: student_id,
            list_name : listDetails.list_name
          })
          console.log(data);


        }catch(err){
          console.log(err)
        }
    }
  return (
    <div className='listpage'>
        <div className="flex-list">
          <h1>{listDetails.list_name}</h1>
            {
              questions.length > 0 &&
            <>
              <button className='pdf-btn'>
                      <PDFDownloadLink document={<QuestionsPDF questions={questions}/>} fileName='mans'
                      download={"dosn"}>
                          {({blob,url,loading,error})=>
                            loading?'loading':'Download as PDF'
                          }
                      </PDFDownloadLink>
                      <img className='pdf-logo' src={pdf}/>
              </button>
              <button onClick={handleCopyList} className='pdf-btn copy-btn'>
                      Copy List
                      <ContentCopyIcon/>
              </button>
            </>
              }
        </div>
        <div className="questions-list">
          {questions?.map((question,key)=><Question question={question} key={key}/>)}
        </div>
    </div>
  )
}

export default ListPage