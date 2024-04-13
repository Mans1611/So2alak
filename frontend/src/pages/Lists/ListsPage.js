import React, { useLayoutEffect, useState } from 'react'
import './listpage.scss';
import List from '../../components/List/List';
import Portal from '../../Portal/Portal';
import CreateListModal from '../../Portal/CreateList/CreateListModal';
import {useParams} from 'react-router-dom';
import { useFetchLists } from '../../hooks/useFetchLists';

const ListsPage = () => {
  const [showCreateModal,setShowCreateModal] = useState(false);
  
  const {student_id} = useParams();
  const [lists,setLists] = useFetchLists(student_id);
  
  const handleCreateList = ()=>{
    setShowCreateModal(true);
  }
  

  useLayoutEffect(()=>{
    const navbar = document.getElementById('navbar');
    if (showCreateModal){
        navbar.style.zIndex = 0;
    }else{
        navbar.style.zIndex = 10;
    }
},[showCreateModal]);
  
  return (
    <div className='list-page'>
      <div className="title">
        <h1>Your List</h1>
      </div>
      <div className="create-wrapper">
       <button onClick={handleCreateList}>Create a List</button>
      </div>
       <div className="list-container">
          {lists.map((list,key)=><List setLists={setLists} key = {key} list={list}/>)}
       </div>
       {
        showCreateModal && 
        <Portal children={<CreateListModal setLists = {setLists} setShowCreateModal={setShowCreateModal}/>}/>
       }
    </div>
  )
}

export default ListsPage