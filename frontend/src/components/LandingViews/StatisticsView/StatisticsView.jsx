import React from "react";

import "./statisticsview.css";
//import SlideComponent from "../SlideComponent/SlideComponent";


const StatisticsView = () => {


  return (
    <div className="statisticsview-container">
      <div className="statistics" >
        <div className="courses" id="slide-1">
          <div className="num">60+</div>
          <div className="title">Varius Courses</div>
        </div>
        <div className="students" id="slide-2">
          <div className="num">10K+</div>
          <div className="title">Clever Students</div>
        </div>
        <div className="answers" id="slide-3">
          <div className="num">1K+</div>
          <div className="title">Verified Answers</div>
        </div>
      </div>
      <div className="feedbacks">
        <div className="title">Students Feedbacks</div>
        <div className="feeds">
          <p className="feed">
            "So?alak is a lifesaver! I can easily find answers to tricky homework questions and connect with peers in my classes. It's intuitive and saves me so much time."
            <i>Sarah</i>
          </p>
          <p className="feed">
            "Navigating So?alak is straightforward, and the community is supportive. Whenever I post a question, I receive helpful responses quickly. It's become my go-to for academic help and advice."
            <i>Emily</i>
          </p>
          <p className="feed">
            "So?alak needs more integration with real-time notifications. Sometimes I miss updates on questions I'm following. Otherwise, it's a great resource for studying and networking with classmates."
            <i>Amr</i>
          </p>
          <p className="feed">
            "So?alak has been instrumental in helping me prepare for exams. The variety of questions and detailed explanations from fellow students make studying more effective and less stressful."
            <i>Ali</i>
          </p>
          <p className="feed">
            "I appreciate how So?alak encourages interaction among students from different majors. It's not just about getting answers; it's about learning from diverse perspectives and expanding my knowledge."
            <i>Lily</i>
          </p>
          <p className="feed">
            "The mobile app version of So?alak is handy when I'm on the go. It's responsive and easy to use, which is crucial for staying connected with academic discussions outside of class."
            <i>Adel</i>
          </p>
        </div>
        <div className="feeds">
          <p className="feed">
            "So?alak is a lifesaver! I can easily find answers to tricky homework questions and connect with peers in my classes. It's intuitive and saves me so much time."
            <i>Sarah</i>
          </p>
          <p className="feed">
            "Navigating So?alak is straightforward, and the community is supportive. Whenever I post a question, I receive helpful responses quickly. It's become my go-to for academic help and advice."
            <i>Emily</i>
          </p>
          <p className="feed">
            "So?alak needs more integration with real-time notifications. Sometimes I miss updates on questions I'm following. Otherwise, it's a great resource for studying and networking with classmates."
            <i>Amr</i>
          </p>
          <p className="feed">
            "So?alak has been instrumental in helping me prepare for exams. The variety of questions and detailed explanations from fellow students make studying more effective and less stressful."
            <i>Ali</i>
          </p>
          <p className="feed">
            "I appreciate how So?alak encourages interaction among students from different majors. It's not just about getting answers; it's about learning from diverse perspectives and expanding my knowledge."
            <i>Lily</i>
          </p>
          <p className="feed">
            "The mobile app version of So?alak is handy when I'm on the go. It's responsive and easy to use, which is crucial for staying connected with academic discussions outside of class."
            <i>Adel</i>
          </p>
        </div>
      </div>
    </div>
  );

};

export default StatisticsView;
