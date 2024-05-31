import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import './feedpage.scss';
import HeartComponent from '../../components/HeartComponent/HeartComponent';
import ThirdPart from '../../components/ThirdPart/ThirdPart';
import AskQuestion from '../../components/AskQuestion/AskQuestion';
import QuestionContainer from '../../components/QuestionContainer/QuestionContainer';



export const FeedPageContext = createContext({});

const FeedPage = () => {
  const [questions,setQuestions] = useState([]);
  return (
    <div  className='feedpage'>
      <FeedPageContext.Provider value={{questions,setQuestions}}>
        <HeartComponent>
          <AskQuestion/>
          <QuestionContainer/>
        </HeartComponent>
        <ThirdPart/>
      </FeedPageContext.Provider>
    </div>
  )
}
export default FeedPage