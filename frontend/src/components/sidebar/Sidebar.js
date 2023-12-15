import React from 'react'
import './sidebar.scss';
const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className="courselist">
        <h2>Courses</h2>
        <ul>

          <li>DataBase</li>
          <li>Algorithms</li>
          <li>DataSceince</li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar;
