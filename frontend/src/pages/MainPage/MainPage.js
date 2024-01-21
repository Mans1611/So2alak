import React, { useState } from 'react'
import './mainpage.scss';
import SideBar from '../../components/sidebar/Sidebar.js';
import HeartComponent from '../../components/HeartComponent/HeartComponent';
import ThirdPart from '../../components/ThirdPart/ThirdPart';
import { Outlet } from 'react-router-dom';

const MainPage = () => {
  
  const [dark,setDark]=useState(false)
  return (
    <div className={`main-page ${dark?'dark':''}`}>
         <SideBar/>
         <Outlet/>  
    </div>
  )
}

export default MainPage;