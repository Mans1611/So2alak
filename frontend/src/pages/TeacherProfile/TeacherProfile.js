import React, { useContext, useEffect, useRef, useState } from 'react'
import avatar from "../../assets/user-tie-solid.svg";
import {AppState} from "../../App";
import './TeacherProfile.scss'


const TeacherProfile = () => {
    const {dark} = useContext(AppState);

    const [username, setUserame] = useState("Mans116");
    const [description, setDescription] = useState("Senior CSE Student @ ASU");

    const months = Array(12).fill(Array(30).fill(0));
    const months_refs  = Array(12).fill(useRef(null));
    const months_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const [verified, setVerified] = useState(0);
    const [unVerified, setUnVerified] = useState(0);
    const [unAnswered, setUnAnswered] = useState(0);

    // to be recieved from backend later but now initialized with fixed data
    const [courses, setCourses] = useState([{name: "DB", students: 95, verified: 8, unVerified: 3, unAnswered: 5},
                                            {name: "OS", students: 123, verified: 4, unVerified: 3, unAnswered: 5},
                                            {name: "RTOS", students: 56, verified: 3, unVerified: 3, unAnswered: 5}]);

    const currentDate = new Date().toDateString().split(" ").slice(0, 4)[1].toLowerCase();

    return (
        <div className={`tprofile_container ${dark? "dark" : ""}`}>
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

                    <div className="middle">
                        <table className='courses'>
                            <thead>
                                <th>Course Name</th>
                                <th>Students</th>
                                <th>Verified</th>
                                <th>UnVerified</th>
                                <th>UnAnswered</th>
                            </thead>
                            <tbody>
                                {courses.map((c, index) => {
                                return <tr>
                                            <td>{c.name}</td>
                                            <td>{c.students}</td>
                                            <td>{c.verified}</td>
                                            <td>{c.unVerified}</td>
                                            <td>{c.unAnswered}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
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

export default TeacherProfile