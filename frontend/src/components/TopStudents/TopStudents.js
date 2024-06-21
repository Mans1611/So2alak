import './topstudents.scss'
import React from 'react'
import first from '../../assets/medals/first.png';
import second from '../../assets/medals/second.png';
import third from '../../assets/medals/third.png';
import { Link } from 'react-router-dom';
const medals = [
    first,
    second,
    third
]
const TopStudents = ({title,properties,values}) => {
  return (
        <div className='topstudnets'>
            <h2>{title}</h2>
            <div className="table-wrapper">
                <div className="header flex">
                    {properties.map((property,key)=><h4 key={key} className='property'>{property}</h4>)}
                </div>
                {
                    values?.map((value,rank)=>{ 
                        return(
                                <div  className="flex value">
                                {value?.map((property,key)=><h4 key={key} className='property'>
                                {key === 0 && <img src={medals[rank]} className='medal' />}
                                    {property}
                                </h4>)}
                                </div>
                           
                        )})}
            </div>
        </div>
    
  )
}

export default TopStudents