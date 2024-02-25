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
  const {dark,setDark} = useContext(AppState);
  const [showToggleList,setShowToggleList] = useState(false);
  // handlers.
  const changeTheme = ()=>setDark(dark=>!dark);
  const showAvatar = ()=>setShowToggleList(show=>!show);

  const username = 'mansour '
  const logout = ()=>{};
  return (
    <div className='navbar'>
        <div className="logo-wrapper">
            <img src={logo} alt="So2alak" srcset="" />
          </div>
        <Search/>
        <div className="links-wrapper">
            <Link className='links' to={'/main/feedpage'}> Home</Link>
            <Link className='links' to={'/leaderboard'}> LeaderBoard</Link>
            <Link className='links' to={'/faviourte'}> Fav</Link>
        </div>
        <div className="avatar-wrapper">
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