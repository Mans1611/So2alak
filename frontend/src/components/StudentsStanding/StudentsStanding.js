import React from 'react'
import './studentsstanding.scss'
import standing from '../../assets/standing.png'
import StudentRow from '../StudentRow/StudentRow'
const StudentsStanding = ({user_standing}) => {
  return (
    <div className='students_standing'>
       <div className="header">
            <img src={standing} alt="" srcset="" />
            LeaderBoard
        </div>
        {
            user_standing?.map((student,key)=><StudentRow student={student} rank={key+1} key={key}/>)
        }

    </div>
  )
}

export default StudentsStanding