import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import './createlist.scss';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { AppState } from '../../App';
const CreateListModal = ({setShowCreateModal,setLists}) => {
    
  

    const [isPrivate,setPrivate]=useState(false);
    const [list_name,setListName] = useState('');
    const {stundetInfo,dark} = useContext(AppState);


    const CreateList = async()=>{
        try{
            const res =await axios.post(`${process.env.REACT_APP_API_URL}/lists/createlist`,{
                list_name,
                isPrivate,
                student_id:stundetInfo.student_id
            })
            if(res.status === 201){
                setLists(prev=>[res.data.data,...prev]);
                setShowCreateModal(false)
            }
        }catch(err){
            console.log(err)
        }
    }

    const handleClose = (e)=>{
        if(Array.from(e.target.classList).includes('modal') || Array.from(e.target.classList).includes('close') || Array.from(e.target.classList).includes('close-icon')){
            setShowCreateModal(false)
        }
    }
  return (
    <div onClick={handleClose} className = {`modal ${dark?'dark':''}`}>
        <div className="modal-container">
            <div className="close-icon">
                <CloseIcon className='close' onClick={handleClose}/>
            </div>
            <h1>Create New List</h1>
            <div className="input-wrapper">
                <label htmlFor="list-name">
                    List Name
                </label>
                <input onChange={(e)=>setListName(e.target.value)} type="text" name="" id="list-name" />
            </div>
            <div className="input-wrapper flex">
                <h3>Public</h3>
                <div class="toggle-container">
                    <input onChange={()=>setPrivate(val=>!val)} type="checkbox" id="toggle" class="toggle-checkbox"/>
                    <label for="toggle" class="toggle-label">
                        <div class="toggle-background"></div>
                        <div class="toggle-circle"></div>
                    </label>
                </div>
                <h3>Private</h3>
            </div>
            <div className="btn-wrapper">
                <button onClick={CreateList}>
                    <AddIcon/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default CreateListModal