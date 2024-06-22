import React, { useContext, useEffect, useRef, useState } from 'react'
import './Profile.scss'
import avatar from "../../assets/user-tie-solid.svg";
import {AppState} from "../../App";
import Calander from '../../components/Calander/Calander';
import { useParams, useSearchParams } from 'react-router-dom'
import Badges from '../../components/Badges/Badges';
import PersonalData from '../../components/PersonalData/PersonalData';
const Profile = () => {
    // get the user id or name for the link as a params.

    let [searchParams, setSearchParams] = useSearchParams();

  // Get the value of the "name" query parameter
    const username = searchParams.get('username');
    const student_id = searchParams.get('student_id');

    const {dark,} = useContext(AppState);
    
 

    return (
        <div className={`profile_container ${dark? "dark" : ""}`}>
            <div className='content'>
                <div className='info'>
                    
                    <div className='upper'>
                        <PersonalData />
                        {/* Badges Comp */}
                        <Badges user_id={student_id}/>
                    </div>
                    <div className='lower'>
                        <Calander user_id={student_id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
