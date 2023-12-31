import React, { useRef, useState } from 'react'
import './question.scss'
import { Link } from 'react-router-dom';
import audio from '../../assets/soundeffects/pop.wav';
import answericon from '../../assets/vectors/answer.png'
import plus from '../../assets/vectors/plus.png';
import minus from '../../assets/vectors/minus.png';
const Question = () => {
    const [helped,setHelp] = useState(false);
    const circle = useRef(null);
    const [helpCount,setHelpCount] = useState(3)
    const [showAnswer,setShowAnswer] = useState(false);
    const [answer,setAnswer] = useState('');
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
                <div className="help-wrapper">
                    <div ref={circle} onClick={handleHelp} className={`circle ${helped?'active':''}`}>
                        {helped? <img className='help-icons'  src={minus} />:<img src={plus} className='help-icons'/>}
                        </div>
                    <h3 className='help-counts'>{helpCount}</h3>
                </div>
            </div>
            <div className='question-wrapper'>
                <div className="question-content">
                    <p> How to solve this idiot problem?? </p>
                    <div className="time">asked @ 12:41</div>
                </div>
                {
            showAnswer &&
            <div className="answer-wrapper">
                <input onChange={(e)=>setAnswer(e.target.value)} placeholder='Answer to question' type="text" />
                <button disabled={answer.trim()==''}>Answer</button>
            </div>
                   
        }    
            </div>
            <img onClick={()=>setShowAnswer(show=>!show)} src={answericon} className='reply-btn'/>
        </div>
        
    </div>
  )
}

export default Question