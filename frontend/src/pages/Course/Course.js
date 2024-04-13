import React, { useContext, useEffect } from 'react'
import HeartComponent from '../../components/HeartComponent/HeartComponent';
import ThirdPart from '../../components/ThirdPart/ThirdPart';
import QuestionContainer from '../../components/QuestionContainer/QuestionContainer';
import AskQuestion from '../../components/AskQuestion/AskQuestion';
import {useParams} from 'react-router-dom';
import { AppState } from '../../App';

const Course = () => {
  
  return (
    <div className='feedpage' style={{paddingLeft:"250px"}}>
        <HeartComponent>
          <AskQuestion/>
          <QuestionContainer/>
        </HeartComponent>
        <ThirdPart/>
    </div>
  )
}

export default Course;