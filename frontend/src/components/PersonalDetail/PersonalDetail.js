import React, { useContext, useEffect, useState } from 'react'
import './personaldetails.scss'
import axios from 'axios'

import { useParams,Link, useNavigate } from 'react-router-dom'
import { AppState } from '../../App'
const PersonalDetail = ({user_id}) => {
    const [userDetails,setUserDetails] = useState({});
    const {stundetInfo} = useContext(AppState); 
    useEffect(()=>{
        const fetchPersonalDetails = async()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/person/getStudnetPersonalDetails/${user_id}`);
                setUserDetails(res.data.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchPersonalDetails();
    },[])
  return (
    <>
    
        <div className='username'>Username : {userDetails.username}</div>
        <div className='personal_details'>
            <div>Level: {userDetails.student_level}</div>
            <div>Department : {userDetails.student_department?userDetails.student_department:'-'}</div>
            <div>Rank : {userDetails.row_rank}</div>
        </div>
        <hr/>
    </>
  )
}

export default PersonalDetail