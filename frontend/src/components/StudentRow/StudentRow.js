import React, { useContext } from 'react'
import './studentrow.scss';
import first from '../../assets/medals/first.png';
import second from '../../assets/medals/second.png';
import third from '../../assets/medals/third.png';
import { AppState } from '../../App';
const medals = [
    first,
    second,
    third
]
const StudentRow = ({student,rank}) => {
    const {stundetInfo} = useContext(AppState);
  return (
    <div className={`grid ${stundetInfo.username === student.username ? 'active':''}`}>
        <div className="field">
            {rank <= 3  && <img src={medals[rank-1]} className='medal' />}
            {rank}
        </div>
        <div className="field">{student.username}</div>
        <div className="field">{student.student_level}</div>
        <div className="field">{student.points}</div>
    </div>
  )
}

export default StudentRow