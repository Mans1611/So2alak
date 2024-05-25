import React, { useEffect, useRef } from 'react'
import './feedpage.scss';
import HeartComponent from '../../components/HeartComponent/HeartComponent';
import ThirdPart from '../../components/ThirdPart/ThirdPart';
import AskQuestion from '../../components/AskQuestion/AskQuestion';
import QuestionContainer from '../../components/QuestionContainer/QuestionContainer';


const FeedPage = () => {
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