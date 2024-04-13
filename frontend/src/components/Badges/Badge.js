import React from 'react'

const Badge = ({badge}) => {
  return (
    <div className='badge'>
        <img src={badge.badge_img} className='badge_icon' alt="" srcSet="" />
        <h3 className='badge_title'>{badge.badge_name}</h3>
    </div>
  )
}

export default Badge