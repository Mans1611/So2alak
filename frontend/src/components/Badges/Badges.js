import React, { useContext, useEffect, useState } from 'react'
import './badges.scss'
import axios from 'axios'
import { AllBadges } from '../../assets/badges/Badges';
import Badge from './Badge';

const Badges = ({user_id}) => {
    const [badges,setBadges]=useState([]);
    useEffect(()=>{
        const fetchBadges = async()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/person/getBadges/${user_id}`);
                setBadges(res.data.badges);
            }catch(err){
                console.log(err)
            }
        }
        fetchBadges();
    },[])
  return (
    <div className='badges'>
        <div className="badges_in">
        <h3>Badges</h3>
        {
            badges?.length>0?
        badges?.map((badge)=>{
            return AllBadges.find(Allbadge=> Allbadge.badge_name === badge.badge_name)
        }).map((badge,key)=><Badge key={key} badge={badge}/>):
        <div>Haven't won any badges yet</div>
        }
        </div>
        
    </div>
  )
}

export default Badges