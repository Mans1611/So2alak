import React from 'react'
import '../Question/question.scss';
import './answer.scss';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const Answer = () => {
  return (
    <div className='answer question'>
         <div className="question-details">
            by <Link to={`/profile/mansour`}> Mansour Mohamed</Link> related to <Link>DataBase</Link>
        </div>
        <div className="flex">
            <div className={`question-help`}>
                <div className="help-wrapper">
                    <div   className={`circle`}>
                        {true? 
                        <RemoveIcon/>
                        :<AddIcon/>}
                    </div>
                    <h3 className='help-counts'>{3}</h3>
                </div>
            </div>
            <div className='question-wrapper'>
            <div className="question-content">
                <p> How to solve this idiot problem?? </p>
                <div className="time">asked @ 12:41</div>
            </div>
                    
            </div>
            </div>
    </div>
  )
}

export default Answer