import React, { useState } from 'react'
import './sidebar.scss';
import {Link} from 'react-router-dom';
import GradeIcon from '@mui/icons-material/Grade';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import shuffle from '../../assets/vectors/shuffle.png';
import mylist from '../../assets/vectors/mylist.png';
import question from '../../assets/vectors/question.png';

const SideBar = () => {
  const [loading,setLoading]=useState(false);
  const [dark,setDark]=useState(false)

  return (
    <div className={`sidebar ${dark?'dark':''}`}>
      <div className="sidebar-logo">
        <img src={shuffle} alt="" srcset="" />
      </div>
      <hr/>
        <div className="side-bar-items">
          <h2 className='title'>You</h2>
          <ul className='list'>
            <li className='items'>
              <Link className='flex' to={'/course/database'}>
                <img className='items-icon' src={mylist}/>
                My List
                </Link>
              </li>
            <li className='items'>
              <Link className='flex' to={'/course/database'}>
                <img className='items-icon' src={question}/>
                My Questions
                </Link>
              </li>
            <li className='items'>
              <Link className='flex' to={'/course/database'}>
                <QuestionAnswerIcon/>
                My Answers
                </Link>
            </li>
        
          </ul>
      </div>
      <hr/>
        <div className="side-bar-items">
            <h2 className='title'>Your Courses</h2>
            <ul className='list'>
      {
        loading? 
        <>
              <div className="loading-card"></div>
              <div className="loading-card"></div>
              <div className="loading-card"></div>              
              <div className="loading-card"></div>              
        </>
          :
          <>
              <li className='items'><Link to={'/course/database'}>DataBase </Link></li>
              <li className='items'><Link to={'/course/database'}>Algorithms </Link></li>
              <li className='items'><Link to={'/course/database'}>DataSceince</Link></li>
              <li className='items'><Link to={'/course/database'}>General </Link></li>
              <li className='items'><Link to={'/course/database'}>Artificail Inteligence </Link></li>
              <li className='items'><Link to={'/course/database'}>Computer Security </Link></li>
              <li className='items'><Link to={'/course/database'}>DataSceince</Link></li>
              <li className='items'><Link to={'/course/database'}>DataSceince</Link></li>
              <li className='items'><Link to={'/course/database'}>Artificail Inteligence </Link></li>
              <li className='items'><Link to={'/course/database'}>Computer Security </Link></li>
              <li className='items'><Link to={'/course/database'}>DataSceince</Link></li>
          </>
            }
            </ul>
        </div>
    </div>
  )
}

export default SideBar;
