import React from 'react';
import './trending.scss';
const Trending = ({top}) => {
  return (
    <div style={top?{top:`${top+110}px`}:{top:'90px'}} className='third_part_child'>
        <div className="header">
            <h1>Trending</h1>
        </div>
    </div>
  )
}

export default Trending