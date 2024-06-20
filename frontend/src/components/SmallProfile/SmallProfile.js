import React, { Suspense, lazy, useEffect, useState } from 'react';
import './smallprofile.scss';
import axios from 'axios';
import { AllBadges } from '../../assets/badges/Badges';
import Badge from '../Badges/Badge';
import Person from '@mui/icons-material/Person';
const SmallProfile = ({handleProfile,username}) => {

  const [loading ,setLoading] = useState(true);
  const [data ,setData] = useState({});
  const [badge,setBadge] = useState({});
  useEffect(()=>{

    const fetchSmallProfile = async()=>{
      try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/person/smallprofile/${username}`);
        if(res.status === 200){
          setLoading(false);
          setData(res.data);
          setBadge(AllBadges.find(badge=>badge.badge_name === res.data.badges.badge_name));
        }

      }catch(err){
        console.log(err);
      }
    }
    fetchSmallProfile();
  },[])
  if (loading)
    return (
    <div 
      className='small-profile laoding'
      onMouseLeave={()=>handleProfile(false)} 
      onMouseOver={()=>handleProfile(true)} 
      >
        <div className="header">
          <div className="circle loading"></div>
          <h2 className='username'>{username}</h2>
        </div>
      </div>
  )

  return (
    <div 
      className='small-profile'
      onMouseLeave={()=>handleProfile(false)} 
      onMouseOver={()=>handleProfile(true)}>
        <div className="header">
          <div className="circle">
            {
              data.img_url ? 
              <img src={data.img_url} alt="" srcset="" />:
              <Person/>
            }
          </div>
          <h2 className='username'>{username}</h2>
        </div>
        <div className="details-info">
          <h3>Level : <span>{data.student_level}</span></h3>
          <h3>Department : <span>{data.student_subdepartment}</span></h3>
          <h3>Points : <span>{data.points}</span></h3>
        </div>
        <div className="badages">
          <h2>Latest Badge:</h2>
          {
            badge ?
          <Badge badge={badge}/>:
          <div>Have not get any badges.</div>
          }
        </div>

    </div>
  )
}

export default SmallProfile