import React, { useContext, useEffect, useRef } from 'react'
import './feedpage.scss';
import HeartComponent from '../../components/HeartComponent/HeartComponent';
import ThirdPart from '../../components/ThirdPart/ThirdPart';
import AskQuestion from '../../components/AskQuestion/AskQuestion';
import QuestionContainer from '../../components/QuestionContainer/QuestionContainer';
import { AppState } from '../../App';


const FeedPage = () => {
  const {isTeacher} = useContext(AppState);
  console.log(isTeacher);
  
  return (
    <div  className='feedpage'>
        <HeartComponent>
          <AskQuestion/>
          <QuestionContainer/>
        </HeartComponent>
        <ThirdPart/>
    </div>
  )
}
export default FeedPage