import React, { useContext } from 'react'
import './postoptions.scss'

import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AppState } from '../../App';
import axios from 'axios';

const PostOptions = ({question,setDeletedQuestion}) => {
    const handleClick = (e)=>{
        e.stopPropagation()
    }
    const {stundetInfo} = useContext(AppState);
    const AUTH = stundetInfo.username === question.q_username;
    const handleEdit = ()=>{}
    
    const handleDelete = async()=>{
          try{
              const res = await axios.delete(`${process.env.REACT_APP_API_URL}/post/deleteQuestion/${question.question_id}`)
              console.log(res);
              if(res.status === 200)
                setDeletedQuestion(true);
          }catch(err){
            console.log(err)
          }
    }
  return (
    <div onClick={handleClick} className='post_options'>
        <ul>
            {
              AUTH && 
                <>
                  <li onClick={handleEdit}>
                    <EditIcon/>  
                    edit
                  </li>
                  <li onClick={handleDelete}>
                    <DeleteIcon />
                    delete
                  </li>
                </>
            }
            <li>           
              <ReportIcon/>  
              report
            </li>
        </ul>
    </div>
  )
}

export default PostOptions