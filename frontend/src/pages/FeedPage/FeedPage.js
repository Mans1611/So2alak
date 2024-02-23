import React from 'react'
import './feedpage.scss';
import HeartComponent from '../../components/HeartComponent/HeartComponent';
import ThirdPart from '../../components/ThirdPart/ThirdPart';


const FeedPage = () => {
  return (
    <div className='feedpage'>
        <HeartComponent/>
        <ThirdPart/>
    </div>
  )
}

export default FeedPage