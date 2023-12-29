import React, { useState } from 'react'
import './feedpage.scss';
import SideBar from '../../components/sidebar/Sidebar.js';
import HeartComponent from '../../components/HeartComponent/HeartComponent';
import ThirdPart from '../../components/ThirdPart/ThirdPart';


const FeedPage = () => {
  document.title = 'feedpage';
  const [dark,setDark]=useState(false)
  return (
    <div className={`main-page ${dark?'dark':''}`}>
        <SideBar/>
        <HeartComponent/>
        <ThirdPart/>
    </div>
  )
}

export default FeedPage