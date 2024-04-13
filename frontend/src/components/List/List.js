import React from 'react'
import './list.scss';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Link } from 'react-router-dom';
const List = ({list,setLists}) => {
    const handleDeleteList= async()=>{
        try{
            const res =await  axios.delete(`${process.env.REACT_APP_API_URL}/lists/deleteList/${list.list_id}`)
            if (res.status === 200){
                setLists(lists=> lists.filter(arrList=>arrList.list_id !== list.list_id));
            }
        }catch(err){
            console.log(err)
        }
    }
  return (

    <div className='list'>
        <Link to= {`list/${list.list_id}`}>
            <h1 className='list-name'>
                {list.list_name.slice(0,10)}
            </h1>
        </Link>
        <div className="items">
            {list.private?<LockIcon/>:<PublicIcon/>}
        </div>
        <div className="items">
            <RemoveRedEyeIcon/>
            {list.viewed}
        </div>
        <div className="items">
            <ContentCopyIcon/>
            {list.copied}
        </div>
        <div className="items">
            <DeleteIcon className='deleteSVG' onClick={handleDeleteList}/>
        </div>
    </div>
  )
}

export default List