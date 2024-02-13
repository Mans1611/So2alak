import React from 'react'
import './navbar.scss';
import logo from '../../assets/logo.png' 
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="logo-wrapper">
            <img src={logo} alt="So2alak" srcset="" />
        </div>
        <div className="search-wrapper">
            <input placeholder='Search for question, course,colleague..' id='search' type="text" name="search-box"/>
        </div>
        <div className="links-wrapper">
            <Link className='links' to={'/main/feedpage'}> Home</Link>
            <Link className='links' to={'/leaderboard'}> LeaderBoard</Link>
            <Link className='links' to={'/faviourte'}> Fav</Link>
        </div>
    </div>
  )
}

export default Navbar