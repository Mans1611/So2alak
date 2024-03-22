import React, { useContext, useState } from 'react'
import './thirdpart.scss';
import { AppState } from '../../App';
import CourseDetails from '../CourseDetails/CourseDetails';
import Trending from '../Trending/Trending';
const ThirdPart = () => {
  const {sidebarSelected} = useContext(AppState);
  
  const [top,setTop] = useState(null);
  
  return (
    <div className='third-part'>
      {
        sidebarSelected && 
        <CourseDetails setTop = {setTop}/>
      }
      <Trending top={top}/>
    </div>
  )
}

export default ThirdPart