import React, { useContext, useEffect, useRef, useState } from 'react'
import './Profile.scss'
import avatar from "../../assets/user-tie-solid.svg";
import {AppState} from "../../App";

const Profile = () => {
    const {dark} = useContext(AppState);

    const [username, setUserame] = useState("Mans116");
    const [description, setDescription] = useState("Senior CSE Student @ ASU");

    const months = Array(12).fill(Array(30).fill(0));
    const months_refs  = Array(12).fill(useRef(null));
    const months_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const [points, setPoints] = useState(0);
    const [questions, setQuestions] = useState(0);
    const [answers, setAnswers] = useState(0);

    const currentDate = new Date().toDateString().split(" ").slice(0, 4)[1].toLowerCase();

    // useEffect(() => {
    //     for (let i = 0; i < months_names.length; i++) {
    //         if (currentDate === months_names[i].toLowerCase()) {
    //             months_refs[i].current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    //             months_refs[i].current.parentNode.scrollTop = months_refs[i].current.offsetTop;
    //         }
    //     }
    // }, [])

    return (
        <div className={`profile_container ${dark? "dark" : ""}`}>
            <div className='nav_bar'>
                nav bar {currentDate}{dark}
            </div>
            <div className='content'>
                <div className='side_bar'>
                    side bar
                </div>
                <div className='info'>
                    <div className="preUpper">
                        <img src={avatar} alt="" />
                        <div className="discription">
                            <p>{username}</p>
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
                        <div className='badges'>
                            <div className='badges_in'>
                                Badges
                            </div>
                        </div>
                    </div>
                    <div className='lower'>
                        <div className='lower_in'>
                            <h1>Activity Calendar</h1>
                            <div className='calendar'>
                                {months.map((month, index) =>
                                    <div ref={months_refs[index]} className='month'>
                                        <div className='cells'>
                                            {month.map((cell) => <div className={`cell ${cell? "active":"passive"}`}></div>)}
                                        </div>
                                        <div className='month_name'>{months_names[index]}</div>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
