import React, { useContext, useEffect, useRef, useState } from 'react'
import './mainpage.scss';
import SideBar from '../../components/sidebar/Sidebar.js';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { AppState } from '../../App';
import Portal from '../../Portal/Portal.js';
import NotificationPortal from '../../Portal/NotificationPortal/NotificationPortal.js';

const MainPage = () => {
  const {dark,auth,showNotification} = useContext(AppState);
  const nav = useNavigate();
  

  useEffect(()=>{
    if (!auth)
      nav('/signin');
    
  },[])
  
  if (auth){
      return (
        <div className="main-page">
      <Navbar/>
      <div className={`body-content ${dark?'dark':''}`}>
          <SideBar/>
          <Outlet/>  
      </div>
      {showNotification&&
      <Portal children={<NotificationPortal />}/>
      }
      </div>
    )
  }
}

export default MainPage;