import React from 'react'
import './smallprofile.scss';
const SmallProfile = ({handleProfile}) => {
  return (
    <div onMouseLeave={()=>handleProfile(false)} onMouseOver={()=>handleProfile(true)} className='small-profile'>
        SmallProfile
        </div>
  )
}

export default SmallProfile