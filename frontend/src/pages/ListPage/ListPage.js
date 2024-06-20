import React, { useEffect, useState } from 'react'
import './listpage.scss'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Question from '../../components/Question/Question';
import pdf from '../../assets/pdf.png'
import {PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import QuestionsPDF from '../../components/PDFQuestions/PDFQuestions';

const ListPage = () => {
    const {list_id} = useParams();
    const [questions,setQuestions] = useState([]);
    const [listDetails,setListDetails] = useState({}); 
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
  return (
    <div className='listpage'>
        <div className="flex-list">
          <h1>{listDetails.list_name}</h1>
            {
              questions.length > 0 &&
            <button className='pdf-btn'>
              
                    <PDFDownloadLink document={<QuestionsPDF questions={questions}/>} fileName='mans'
                    download={"dosn"}>
                        {({blob,url,loading,error})=>
                          loading?'loading':'Download as PDF'
                        }
                    </PDFDownloadLink>
                    <img className='pdf-logo' src={pdf}/>
            </button>
              }
        </div>
        <div className="questions-list">
          {questions?.map((question,key)=><Question question={question} key={key}/>)}
        </div>
    </div>
  )
}

export default ListPage