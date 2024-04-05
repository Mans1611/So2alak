import React, { Suspense, lazy, useState } from 'react';
import './smallprofile.scss';
const SmallProfile = ({handleProfile,username}) => {
  const [loading ,setLoading] = useState(true);
  if (loading)
    return (
    <div 
      className='small-profile'
      onMouseLeave={()=>handleProfile(false)} 
      onMouseOver={()=>handleProfile(true)} 
      >
        <div className="header">
          <div className="circle"></div>
          <h2 className='username'>{username}</h2>
        </div>
      </div>
  )

  return (
    <div 
      className='small-profile'
      onMouseLeave={()=>handleProfile(false)} 
      onMouseOver={()=>handleProfile(true)} 
      >
        
    </div>
  )
}

export default SmallProfile