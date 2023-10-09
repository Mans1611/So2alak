import React from 'react'
import logo from '../../assets/logo.png';
import avatar from '../../assets/photoperson.png';
import moon from '../../assets/moon.png';

const SimpleNavBar = ({setDark}) => {

  return (
    <div className='welcome-nav-bar'>
        <img className='logo' src={logo} alt="So2alak"/>
        <div className="right-items">
            <div className="avatar-wrapper">
                <img src={avatar} alt="person"/>
            </div>
            <img onClick={()=>setDark(dark=>!dark)} src={moon} alt='moon'/>
        </div>
    </div>
  )
}

export default SimpleNavBar