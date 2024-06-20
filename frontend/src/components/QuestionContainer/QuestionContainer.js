import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import './questioncontainer.scss';
import Question from '../Question/Question';
import LoadingQuestion from '../Question/LoadingQuestion';
import { AppState } from '../../App';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import QuestionFilter from '../QuestionFilter/QuestionFilter';
import { FeedPageContext } from '../../pages/FeedPage/FeedPage';

const reducer = (state,{type})=>{
    switch(type){
      case 'ALL':
        return {
          ...state,
          API : `/post/allquestions/?student_id=${state.student_id}&student_name=${state.username}&filter=all`,
          filter:"ALL"
        }
      case 'Unsolved' :
        return {
          ...state,
          API : `/post/allquestions/?student_id=${state.student_id}&student_name=${state.username}&filter=unsolved`,
          filter:'Unsolved'
        }
      case 'Verified':
        return {
          ...state,
          API : `/post/allquestions/?student_id=${state.student_id}&student_name=${state.username}&filter=verified`,
          filter:'Verified'
        }
      case 'Unverified':
        return {
          ...state,
          API : `/post/allquestions/?student_id=${state.student_id}&student_name=${state.username}&filter=unverified`,
          filter:'Unverified'
        }
      case 'Popular':
        return {
          ...state,
          API : `/post/allquestions/?student_id=${state.student_id}&student_name=${state.username}&filter=popular`,
          filter:'Popular'
        }
    }
}
const QuestionContainer = React.memo(()=>{
  const [loading,setLoading] = useState(false);
  
  const {questions,setQuestions} = useContext(FeedPageContext);
  const {course_code} = useParams();
  const {user_courses,isTeacher,sidebarSelected,setSideBarSelected,stundetInfo} = useContext(AppState);
  
  const intialState = {
    API : `/post/allquestions/?student_id=${stundetInfo.student_id}&student_name=${stundetInfo.username}&filter=all`,
    filter:"ALL",
    student_id:stundetInfo.student_id,
    username:stundetInfo.username
  }
  const [filter,dispatchFilter] = useReducer(reducer,intialState);
  


  useEffect(()=>{
    let course_id = user_courses.filter(course=>course.course_id === course_code?.toUpperCase());

    if (course_id.length > 0){
      setSideBarSelected(course_id[0].course_id?.toUpperCase())
    }
    else{
      setSideBarSelected(course_code?.toUpperCase())
    }
    if (!course_code) document.title = 'FeedPage'
  },[course_code])
  useEffect(()=>{
    setLoading(true)
    const data= async()=> {
      let response = null;
      if(isTeacher){
        response = await axios.get(`${process.env.REACT_APP_API_URL}/post/allTeacherQuestions/${stundetInfo.user_id}`);
      }
      else if(sidebarSelected || course_code){
        response = await axios.get(`${process.env.REACT_APP_API_URL}/post/${sidebarSelected?sidebarSelected:course_code}`)
      }else{
        response = await axios.get(`${process.env.REACT_APP_API_URL}${filter.API}`)
      }
      setQuestions(response.data?.data ? response.data.data :[]);
      setLoading(false)
    };
    data();
  },[sidebarSelected,course_code,filter])
    
  
  return (
    <div  className='questions-container'>
        <QuestionFilter filter = {filter} dispatchFilter={dispatchFilter}/>
        <div className="questions-list">
          {loading ? <LoadingQuestion/> : questions.map((question,key)=><Question question={question} key={key}/>)}
        </div>
    </div>
  )
})

export default QuestionContainer