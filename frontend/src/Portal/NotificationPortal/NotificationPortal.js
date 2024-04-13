import React from 'react'
import './notification.scss';
import verified from '../../assets/badges/verified.png'
const NotificationPortal = () => {
    
  return (
    <div className='notification-wrapper'>
        <h2 className='congrates'>Congratulations</h2>
        <h1>Verified Answer</h1>
        <img className='badge_notification' src={verified} alt="" srcSet="" />
    </div>
  )
}

export default NotificationPortal