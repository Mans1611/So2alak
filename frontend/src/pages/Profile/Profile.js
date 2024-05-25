import React, { useContext, useEffect, useRef, useState } from 'react'
import './Profile.scss'
import avatar from "../../assets/user-tie-solid.svg";
import {AppState} from "../../App";
import Calander from '../../components/Calander/Calander';
import { useParams } from 'react-router-dom'
import Badges from '../../components/Badges/Badges';
import PersonalData from '../../components/PersonalData/PersonalData';
const Profile = () => {
    const {user_id} = useParams();// get the user id or name for the link as a params.
    const {dark,username} = useContext(AppState);
    const [description, setDescription] = useState("Senior CSE Student @ ASU");
   
 

    return (
        <div className={`profile_container ${dark? "dark" : ""}`}>
            <div className='content'>
                <div className='info'>
                    <div className="preUpper">
                        <img src={avatar} alt="" />
                        <div className="discription">
                            <p>MAnsoru</p>
                            <p>{description}</p>
                        </div>
                    </div>
                    <div className='upper'>
                        <PersonalData/>
                        {/* Badges Comp */}
                        <Badges/>
                    </div>
                    <div className='lower'>
                        <Calander user_id={user_id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
