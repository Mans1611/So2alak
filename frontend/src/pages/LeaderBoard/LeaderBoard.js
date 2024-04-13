import React from 'react'
import './leaderboard.scss'
import CoursesTabs from '../../components/CoursesTabs/CoursesTabs'
const LeaderBoard = () => {
    document.title = 'LeaderBoard';
return (
    <div className='leaderboard-page'>
        <CoursesTabs/>
    </div>
  )
}

export default LeaderBoard