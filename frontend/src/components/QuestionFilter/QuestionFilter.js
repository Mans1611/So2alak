import React from 'react'
import './question_filter.scss';
const QuestionFilter = ({filter,dispatchFilter}) => {
  
    return (
    <div className='question_filter'>
        <div onClick={()=>dispatchFilter({type:'ALL'})} className={`filter_name ${filter.filter==='ALL'?'active':''}`}>ALL</div>
        <div onClick={()=>dispatchFilter({type:'Unsolved'})} className={`filter_name ${filter.filter==='Unsolved'?'active':''}`}>Unsolved</div>
        <div onClick={()=>dispatchFilter({type:'Verified'})} className={`filter_name ${filter.filter==='Verified'?'active':''}`}>Verified</div>
        <div onClick={()=>dispatchFilter({type:'Unverified'})} className={`filter_name ${filter.filter==='Unverified'?'active':''}`}>Unverified</div>
        <div onClick={()=>dispatchFilter({type:'Popular'})} className={`filter_name ${filter.filter==='Popular'?'active':''}`}>Popular</div>
    </div>
  )
}

export default QuestionFilter