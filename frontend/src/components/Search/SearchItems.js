import React from 'react'
import { Link } from 'react-router-dom';
import './searchitems.scss'
import avatar from '../../assets/avatar.png' 
import Person from '@mui/icons-material/Person';
const SearchItems = ({setShowSearch,title,items}) => {
  if (title === 'Students')
    return (
      <div className='search-items'>
          <h6 className="title">{title}</h6>
          <ul>
            {items.map((item,key)=>
                 <li onClick={()=>setShowSearch(false)} key={key} className='search-li'>
                <Link to = {`/main/profile/${item.username}`}>
                      <div className="flex">
                        {
                          item.img_url?
                          <img src={item.img_url} alt={item.username} srcset="" />:
                          <Person/>
                        }
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
                  <li onClick={()=>setShowSearch(false)} className='search-li'>
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
               <li onClick={()=>setShowSearch(false)} className='search-li'>
                  <Link key={key} to = {`/main/${item.course_id}`}>
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