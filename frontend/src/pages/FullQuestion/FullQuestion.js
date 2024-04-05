import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import './fullQuestion.scss';
import HeartComponent from '../../components/HeartComponent/HeartComponent';
import Question from '../../components/Question/Question';

const FullQuestion = () => {

    const {question_id} = useParams();
    const [question,setQuestion] = useState({});
    const [loading,setLoading] = useState(true);
    console.log(question)
    useEffect(()=>{
        let subscribe = true;
        const fetchQuestion = async()=>{
            const {data} = await axios.get(`http://localhost:8000/post/getQuestion/${question_id}`);
            setQuestion(data.data);
            setLoading(false);
            document.title = question.question;
        }
        fetchQuestion();
        return ()=>{
            subscribe = false;
        }
    },[])
    if (loading)
        return <div>Loading</div>
    return (
    <div className='fullquestion'>
        <HeartComponent>
            <Question singleQuestion={true} question={question}/>
        </HeartComponent>
    </div>
  )
}

export default FullQuestion