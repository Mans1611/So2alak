import React, { useContext, useState } from 'react'
import './navbar.scss';
import logo from '../../assets/logo.png' 
import avatar from '../../assets/avatar.png' 
import { Link } from 'react-router-dom';
import { AppState } from '../../App';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Search from '../Search/Search';

const Navbar = () => {
  // states
  const {dark,setDark,
    username,
    sidebarSelected,setSideBarSelected
  } = useContext(AppState);
  
  const [showToggleList,setShowToggleList] = useState(false);
  // handlers.
  const changeTheme = ()=>setDark(dark=>!dark);
  const showAvatar = ()=>setShowToggleList(show=>!show); 
  const logout = ()=>{};
  const handleActive=()=>{
    setSideBarSelected('general')
  }
  return (
    <div className={`navbar ${dark && 'dark'}`}>
        <div className="logo-wrapper">
            <img src={logo} alt="So2alak" srcset="" />
          </div>
        <Search/>
        <div className="links-wrapper">
            <Link onClick={()=>handleActive('general')} className='links' to={'/main/feedpage'}> Home</Link>
            <Link className='links' to={'/leaderboard'}> LeaderBoard</Link>
            <Link className='links' to={'/faviourte'}> Fav</Link>
        </div>
        <div className="avatar-wrapper">
          <h1 className="username">
            {username?username:'Mans1611'}
          </h1>
          <div className="img-wrapper">
          <img onClick = {showAvatar} src={avatar} alt="" srcset="" />
            {showToggleList && 
              <ul className='toggle-list'>
                <li><Link to={`/profile/${username}`}>My profile</Link></li>
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