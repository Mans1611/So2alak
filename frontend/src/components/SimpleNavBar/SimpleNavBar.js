import React, { useContext } from 'react'
import logo from '../../assets/logo.png';
import avatar from '../../assets/photoperson.png';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppState } from '../../App';

const SimpleNavBar = () => {
    
    const {dark,setDark} = useContext(AppState);
  return (
    <div className='welcome-nav-bar'>
        <img className='Logo' src={logo} alt="So2alak"/>
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