import React, { useRef } from 'react'
import './feedpage.scss';
import HeartComponent from '../../components/HeartComponent/HeartComponent';
import ThirdPart from '../../components/ThirdPart/ThirdPart';
const FeedPage = () => {
  const ques_container = useRef(null);
  
  const detectBottom = ()=>{  
    console.log(ques_container.current.scrollTop)
  }
  return (
    <div ref={ques_container} onScroll={detectBottom} className='feedpage'>
        <HeartComponent/>
        <ThirdPart/>
    </div>
  )
}

export default FeedPage