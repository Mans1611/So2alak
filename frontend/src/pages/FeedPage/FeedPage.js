import React from 'react'
import './feedpage.scss';
import SideBar from '../../components/sidebar/Sidebar.js';
import QuestionsContainer from '../../components/Questionscontainer/QuestionsContainer';


const FeedPage = () => {
  return (
    <div className='main-page'>
        <SideBar/>
        <QuestionsContainer/>
    </div>
  )
}

export default FeedPage