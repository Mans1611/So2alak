import React, { useContext, useEffect, useRef, useState } from 'react'
import avatar from "../../assets/user-tie-solid.svg";
import {AppState} from "../../App";
import './TeacherProfile.scss'
import { useParams } from 'react-router-dom';
import Calander from '../../components/Calander/Calander';
import PiChartData from '../../components/PiChartData/PiChartData';


const TeacherProfile = () => {
    const {dark} = useContext(AppState);
    const {teacher_id} = useParams();
    
    const [description, setDescription] = useState("Senior CSE Student @ ASU");
    const {stundetInfo} = useContext(AppState);
    
    const [verified, setVerified] = useState(1);
    const [unVerified, setUnVerified] = useState(5);
    const [unAnswered, setUnAnswered] = useState(5);

   
    
    return (
        <div className={`profile_container ${dark? "dark" : ""}`}>
            <div className='content'>
                <div className='info'>
                    <div className="preUpper">
                        <img src={avatar} alt="" />
                        <div className="discription">
                            <p>{stundetInfo.username}</p>
                            <p>{description}</p>
                        </div>
                    </div>
                    <div className='upper'>
                        <div className='score'>
                            <div className='score_in'>
                                <div className='achieved'><p>{verified}</p> <p>Verified Answers</p></div>
                            </div>
                            <div className='score_in'>
                                <div className='achieved'><p>{unVerified}</p> <p>UnVerified Questions</p></div>
                            </div>
                            <div className='score_in'>
                                <div className='achieved'><p>{unAnswered}</p> <p>UnAnswered Questions</p></div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="chart-container">
                        <PiChartData/>
                    </div>
                    <div className='lower'>
                        <Calander user_id={teacher_id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherProfile