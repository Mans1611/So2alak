import React, { useContext, useEffect, useState } from 'react'
import HeartComponent from '../../components/HeartComponent/HeartComponent';
import ThirdPart from '../../components/ThirdPart/ThirdPart';
import QuestionContainer from '../../components/QuestionContainer/QuestionContainer';
import AskQuestion from '../../components/AskQuestion/AskQuestion';
import {useParams} from 'react-router-dom';
import { AppState } from '../../App';
import { FeedPageContext } from '../FeedPage/FeedPage';

const Course = () => {
  const [questions,setQuestions] = useState([]);

  return (
    <div className='feedpage' style={{paddingLeft:"250px"}}>
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

export default Course;