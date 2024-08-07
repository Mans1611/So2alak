import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import './fullQuestion.scss';
import HeartComponent from '../../components/HeartComponent/HeartComponent';
import Question from '../../components/Question/Question';
import { AppState } from '../../App';

const FullQuestion = () => {

    const {question_id} = useParams();
    const [question,setQuestion] = useState({});
    const [loading,setLoading] = useState(true);
    const {stundetInfo} = useContext(AppState);
    useEffect(()=>{
        let subscribe = true;
        const fetchQuestion = async()=>{
            try{
                console.log("fetching question")
                const {data,status} = await axios.get(`${process.env.REACT_APP_API_URL}/post/getQuestion/?question_id=${question_id}&student_id=${stundetInfo.student_id}`);
                if(status ===200){
                    setQuestion(data[0]);
                    setLoading(false);
                }
                document.title = data[0]?.question;
            }catch(err){
                console.log(err);
            }
        }
        if (subscribe) fetchQuestion();
        return ()=>{
            subscribe = false;
        }
    },[])
    if (loading)
        return <div>Loading</div>
    return (
    <div className='fullquestion'>
        <HeartComponent>
            <Question singleQuestion={true} setQuestion={setQuestion} question={question}/>
        </HeartComponent>
    </div>
  )
}

export default FullQuestion