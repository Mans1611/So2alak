import React from 'react'
import './postoptions.scss'

import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const PostOptions = () => {
    const handleClick = (e)=>{
        e.stopPropagation()
    }
  return (
    <div onClick={handleClick} className='post_options'>
        <ul>
            <li>
              <EditIcon/>  
              edit
            </li>
            <li>
              <DeleteIcon/>
              delete
              </li>
            <li>
              <ReportIcon/>  
              report
            </li>
        </ul>
    </div>
  )
}

export default PostOptions