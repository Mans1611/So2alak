import React from 'react'
import logo from '../../assets/logo.png';
import avatar from '../../assets/photoperson.png';
import moon from '../../assets/moon.png';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';
const SimpleNavBar = ({dark,setDark}) => {

  return (
    <div className='welcome-nav-bar'>
        <img className='logo' src={logo} alt="So2alak"/>
        <div className="right-items">
            <div className="avatar-wrapper">
                <img src={avatar} alt="person"/>
            </div>
            <div className="theme-wrapper">
                {
                    dark?
                    <Brightness7Icon onClick={()=>setDark(dark=>!dark)}/>
                    :
                    <DarkModeIcon onClick={()=>setDark(dark=>!dark)}/>
                }
            </div>
           
        </div>
    </div>
  )
}

export default SimpleNavBar