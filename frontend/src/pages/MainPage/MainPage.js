import React, { useRef, useState } from 'react'
import './mainpage.scss';
import SideBar from '../../components/sidebar/Sidebar.js';
import HeartComponent from '../../components/HeartComponent/HeartComponent';
import ThirdPart from '../../components/ThirdPart/ThirdPart';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const MainPage = () => {
  const ques_container = useRef(null);
  
  const [dark,setDark]=useState(false)
  return (
    <div className="main-page">
    <Navbar/>
    <div className={`body-content ${dark?'dark':''}`}>
         <SideBar/>
         <Outlet/>  
    </div>
    </div>
  )
}

export default MainPage;