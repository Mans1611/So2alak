import React, { useContext, useEffect, useRef, useState } from 'react'
import './Profile.scss'
import avatar from "../../assets/user-tie-solid.svg";
import {AppState} from "../../App";
import Calander from '../../components/Calander/Calander';
import { useParams } from 'react-router-dom'
const Profile = () => {
    const {user_id} = useParams();// get the user id or name for the link as a params.
    const {dark,username} = useContext(AppState);
    const [description, setDescription] = useState("Senior CSE Student @ ASU");
   
    const [points, setPoints] = useState(0);
    const [questions, setQuestions] = useState(0);
    const [answers, setAnswers] = useState(0);

    const currentDate = new Date().toDateString().split(" ").slice(0, 4)[1].toLowerCase();


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
                        <div className='score'>
                            <div className='score_in'>
                                <div className='achieved'><p>{points}</p> <p>Points</p></div>
                                <div className='achieved'><p>{questions}</p> <p>Questions</p></div>
                                <div className='achieved'><p>{answers}</p> <p>Answers</p></div>
                            </div>
                        </div>

                        {/* Badges Comp */}
                        <div className='badges'>
                            <div className="badges_in">
                            Badges
                            </div>
                            
                        </div>
                    </div>
                    <div className='lower'>
                        <Calander/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
