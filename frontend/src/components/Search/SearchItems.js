import React from 'react'
import { Link } from 'react-router-dom';
import './searchitems.scss'
import avatar from '../../assets/avatar.png' 
const SearchItems = ({title,items}) => {
  if (title === 'Students')
    return (
      <div className='search-items'>
          <h6 className="title">{title}</h6>
          <ul>
            {items.map((item,key)=>
                 <li className='search-li'>
                <Link to = {`/profile/${item.username}`}>
                      <div className="flex">
                        <img src={avatar} alt="" srcset="" />
                        <div className="main-username">{item.username?.slice(0,20)}</div>
                      </div>
                </Link>
                  </li>
            )}
          </ul>
      </div>
    )
    else if (title === 'Questions'){
      return (
        <div className='search-items'>
          <h6 className="title">{title}</h6>
          <ul>
            {items.map((item,key)=>
                  <li className='search-li'>
                <Link key={key} to = {`/question/${item.question_id}`}>
                      <div className="flex">
                        <img src={avatar} alt="" srcset="" />
                        <div className="main_title">{item.question?.slice(0,60)}</div>
                      </div>
                </Link>
                  </li>
            )}
          </ul>
      </div>
      )
    }
    else if(title === 'Courses'){
      return (
        <div className='search-items'>
          <h6 className="title">{title}</h6>
          <ul>
            {items.map((item,key)=>
               <li className='search-li'>
                  <Link key={key} to = {`/course/${item.course_name?.toLowerCase().replace(' ','')}`}>
                        <div className="flex">
                          <img src={avatar} alt="" srcset="" />
                          <div className="main_title">{item.course_name}</div>
                        </div>
                  </Link>
                </li>
            )}
          </ul>
      </div>
      )
    }
}

export default SearchItems