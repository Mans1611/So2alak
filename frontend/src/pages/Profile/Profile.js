import React, { useState } from 'react';
import './Profile.scss';
import avatar from "../../assets/user-tie-solid.svg";

// انا حطتلك الملف دا في ملف ال app.js
// رن الفرونت اند و روح على اللينك دا 
//  /main/profile/
const Profile = () => {
    const [username, setUserame] = useState("Mans116");
    const [description, setDescription] = useState("Senior CSE Student @ ASU");
    
    // طب ماهو فيه شهور 31 يوم و فيه شهرنا دا فيه 29 كل اربع سنسن
    const [months, setMonths] = useState(Array(12).fill(Array(30).fill(0))); 
    const months_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const [points, setPoints] = useState(0);
    const [questions, setQuestions] = useState(0);
    const [answers, setAnswers] = useState(0);

    return (
        <div className='profile_container'>
            <div className='nav_bar'>
                nav bar
            </div>
            <div className='content'>
                {/* شيل السايد بار عشان هتتحط ف  */}

                <div className='side_bar'>
                    side bar
                </div>
                {/*  دا بس اللي انا عايزه في ملف البروفايل غير كدا هو عندي. يعني اللي فوق دا يتشال */}
                <div className='info'>
                    <div className="preUpper">
                        <img src={avatar} alt="" />
                        <div className="discription">
                            <p>{username}</p>
                            <p>{description}</p>
                        </div>
                    </div>
                    <div className='upper'>
                        {/* دا كومبوننت لوحده اسمه سكور عشان بعد كدا هنعمل بيه فيتش 
                        ويكون جواه الستيات بتاعته زي البوينت و الاسئله و كدا.
                        */}
                        
                        <div className='score'>
                            <div className='score_in'>
                                <div className='achieved'><p>{points}</p> <p>Points</p></div>
                                <div className='achieved'><p>{questions}</p> <p>Questions</p></div>
                                <div className='achieved'><p>{answers}</p> <p>Answers</p></div>
                            </div>
                        </div>
                        {/*  ودا اخر الكومبوننت السكور */}

                        {/* ودا برضوا كومبوننت البادجيز  */}
                        <div className='badges'>
                            <div className='badges_in'>
                                Badges
                            </div>
                        </div>
                    </div>
                    <div className='lower'>
                        {/* ودا كومبوننت الكالندر  */}
                        <div className='lower_in'>
                            <h1>Activity Calendar</h1>
                            <div className='calendar'>
                                {months.map((month, index) =>
                                    <div className='month'>
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
