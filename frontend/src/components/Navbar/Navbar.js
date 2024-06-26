import React, { useContext, useEffect, useRef, useState } from 'react'
import './navbar.scss';
import logo from '../../assets/logo.png' 
import avatar from '../../assets/avatar.png' 
import { Link, useNavigate } from 'react-router-dom';
import { AppState } from '../../App';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Search from '../Search/Search';
import Person from '@mui/icons-material/Person';
import { useHidePop } from '../../hooks/useHidePop';

const Navbar = () => {
  // states
  const {dark,setDark,
    stundetInfo,setStudentInfo,
    setUserCourses,setSideBarSelected,
    setAuth,isTeacher,setIsTeacher
  } = useContext(AppState);
  const nav = useNavigate();
  const [showToggleList,setShowToggleList] = useState(false);
  // handlers.
  const changeTheme = ()=>setDark(dark=>!dark);
  const showAvatar = ()=>setShowToggleList(show=>!show); 
  const logout = ()=>{
    setAuth(false);
    setIsTeacher(false);
    setStudentInfo({});
    setUserCourses([])
    nav('/signin')
  };
  const handleActive=(param)=>{
    setSideBarSelected(param)
  }
  
    const {divRef} = useHidePop(setShowToggleList);
    return (
    <div id='navbar' className={`navbar ${dark ? 'dark':''}`}>
        <div className="logo-wrapper">
            <img src={logo} alt="So2alak" srcSet="" />
          </div>
        <Search/>
        <div className="links-wrapper">
            <Link onClick={()=>handleActive(null)} className='links' to={'/main/feedpage'}> Home</Link>
            <Link className='links' to={'leaderboard'}> LeaderBoard</Link>
            <Link className='links' to={'/faviourte'}> Fav</Link>
        </div>
        <div className="avatar-wrapper">
          <h1 className="username">
            {stundetInfo.username?stundetInfo.username.slice(0,16):'Mans1611'}
          </h1>
          <div onClick = {showAvatar} ref={divRef} className="img-wrapper">
            {
              stundetInfo.img_url?
              <img  src={stundetInfo?.img_url} alt="" srcSet="" />
              :
              <Person style={{width:'40px',cursor:'pointer',height:'40px'}}/>
            }
            {showToggleList && 
              <ul className='toggle-list'>
                <li><Link to={isTeacher?
                  `/main/teacherprofile/${stundetInfo.user_id.replace(" ","")}`
                  :`/main/profile/?username=${stundetInfo.username.replace(" ","")}&student_id=${stundetInfo.student_id}`}>My profile</Link></li>
                <li onClick={logout}>Log Out</li>
              </ul>
            }
            </div>
          <div onClick={changeTheme} className="theme-mode">
            {dark ? <WbSunnyIcon/>:<DarkModeIcon/>}
          </div>
        </div>
    </div>
  )
}

export default Navbar