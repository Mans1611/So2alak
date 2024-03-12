import React, { useState } from 'react'
import '../Question/question.scss';
import './answer.scss';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const Answer = ({answer}) => {
    const [helped,setHelped] = useState(false);
    const [count,setCount]=useState(0)

    const handleHelper = ()=>{
        setHelped(help=>!help);
        if(helped){
            setCount(count=>count-1);
            return
        }
        setCount(count=>count+1);
    }
  return (
    <div className='answer question'>
         <div className="question-details">
            by <Link to={`/profile/mansour`}> Mansour Mohamed</Link> related to <Link>DataBase</Link>
        </div>
        <div className="flex">
            <div className={`question-help`}>
                <div className="help-wrapper">
                    <div onClick={handleHelper} className={`circle`}>
                        {helped? 
                        <RemoveIcon/>
                        :<AddIcon/>}
                    </div>
                    <h3 className='help-counts'>{count}</h3>
                </div>
            </div>
            <div className='question-wrapper'>
            <div className="question-content">
                <p> {answer.answer ? answer.answer:'ans' } </p>
                <div className="time">asked @ 12:41</div>
            </div>
                    
            </div>
            </div>
    </div>
  )
}

export default Answer