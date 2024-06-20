import React, { useContext } from 'react'
import './listoptions.scss';
import { AppState } from '../../App';
import { useFetchLists } from '../../hooks/useFetchLists';
import { useAddToList } from '../../hooks/useAddToList';
const ListOptions = ({question}) => {

    const {stundetInfo} = useContext(AppState);
    const [lists] = useFetchLists(stundetInfo.student_id);
    
    const AddToList = (list_id)=>{
        console.log(list_id)
        useAddToList(stundetInfo,question,true,list_id);
    }
  return (
    <div className='listoptions'>
        {lists.map((list,key)=><div className='option' onClick={(e)=>{e.stopPropagation();AddToList(list.list_id)}} key={key}>{list.list_name}</div>)}
    </div>
  )
}

export default ListOptions