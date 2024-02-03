import React from 'react'
import { team_members } from '../../data/Team_member_Data';

const Person = (props) => {

  return (
    <div  onClick={()=>{props.setSelected(team_members[props.id]);props.setShowModal(true)}} className="person">
        <img className='person-img' src={props.img} alt={props.name} srcset="" />
        <h1 style={{bottom:props.middlle && '20px'}} className={`person-name ${!props.middle&& 'side'}`}>{props.name}</h1>
    </div>
  )
}

export default Person