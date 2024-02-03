import React from 'react'

const Person = (props) => {
  return (
    <div className="person">
        <img className='person-img' src={props.img} alt={props.name} srcset="" />
        <h1 style={{bottom:props.middlle && '20px'}} className={`person-name ${!props.middle&& 'side'}`}>{props.name}</h1>
    </div>
  )
}

export default Person