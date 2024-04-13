import React, { useContext, useEffect, useState } from 'react'
import './badges.scss'
import axios from 'axios'
import { AppState } from '../../App';
import { AllBadges } from '../../assets/badges/Badges';
import Badge from './Badge';

const Badges = () => {
    const {stundetInfo} = useContext(AppState);
    const [badges,setBadges]=useState([]);
    useEffect(()=>{
        const fetchBadges = async()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/person/getBadges/${stundetInfo?.student_id}`);
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
        {badges?.map((badge,key)=>{
            return AllBadges.find(Allbadge=> Allbadge.badge_name === badge.badge_name)
        }).map((badge,key)=><Badge key={key} badge={badge}/>)}
        </div>
        
    </div>
  )
}

export default Badges