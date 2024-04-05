import React, { useRef } from 'react'
import './feedpage.scss';
import HeartComponent from '../../components/HeartComponent/HeartComponent';
import ThirdPart from '../../components/ThirdPart/ThirdPart';
import AskQuestion from '../../components/AskQuestion/AskQuestion';
import QuestionContainer from '../../components/QuestionContainer/QuestionContainer';


const FeedPage = () => {
  const ques_container = useRef(null);
  const detectBottom = ()=>{}
  return (
    <div ref={ques_container} onScroll={detectBottom} className='feedpage'>
        <HeartComponent>
          <AskQuestion/>
          <QuestionContainer/>
        </HeartComponent>
        <ThirdPart/>
    </div>
  )
}
export default FeedPage