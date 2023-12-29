import React, { useRef, useState } from 'react'
import './question.scss'
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import audio from '../../assets/soundeffects/pop.wav'
const Question = () => {
    const [helped,setHelp] = useState(false);
    const circle = useRef(null)
    const [helpCount,setHelpCount] = useState(3)
    const handleHelp = ()=>{
        const pop = new Audio(audio); 
        if(helped){
            circle.current.style.transform = 'rotate(180deg)';
            setHelp(false)
            setHelpCount(count=>count=count-1)
        }
        else {
            pop.play();
            circle.current.style.transform = 'rotate(0deg)';
            setHelp(true)
            setHelpCount(count=>count=count+1)

        }
    
    }
  return (
    <div className='question'>
        <div className="question-details">
            by <Link to={`/profile/mansour`}> Mansour Mohamed</Link> related to <Link>DataBase</Link>
        </div>
        <div className="flex">
            <div className={`question-help`}>
                <div ref={circle} onClick={handleHelp} className={`circle ${helped?'active':''}`}>{helped?'-':'+'}</div>
                <h3 className='help-counts'>{helpCount}</h3>
            </div>
            <div className="question-content">
                    How to solve this idiot problem??
            </div>
        </div>
    </div>
  )
}

export default Question