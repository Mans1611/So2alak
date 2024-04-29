import React, { useEffect, useState } from 'react'
import './listpage.scss'
import {useParams} from 'react-router-dom';
import QuestionContainer from '../../components/QuestionContainer/QuestionContainer';
import axios from 'axios';
import Question from '../../components/Question/Question';

const ListPage = () => {
    const {list_id} = useParams();
    const [questions,setQuestions] = useState([]);
    useEffect(()=>{
        const fetchList = async ()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/lists/${list_id}`)
                if (res.status===200)
                    setQuestions(res.data.data);
            }catch(err){
            console.log(err);   
            }
        }
        fetchList();
    },[])
  return (
    <div className='listpage'>
        <h1>List Name</h1>
        <div className="questions-list">
          {questions.map((question,key)=><Question question={question} key={key}/>)}
        </div>
    </div>
  )
}

export default ListPage