import React from "react";

import "./statisticsview.css";
import SlideComponent from "../SlideComponent/SlideComponent";
import QandA from "../../../assets/landing/QandA.png";
import courses from "../../../assets/landing/courses.png";
import students from "../../../assets/landing/students.png";

const StatisticsView = () => {

  
  return (
    <div className="statisticsview-container" >
      <div className="statistics" >
        <SlideComponent title="" img={students} description={<p className="descrip">Join more than <p className="statistics-no"> +10000 </p> Students.</p>} img_no="1" view="s-v"/>
        <SlideComponent title="" img={QandA} description={<p className="descrip">More than <p className="statistics-no"> +1000 </p> question with <span> verified answers</span>.</p>} img_no="2" view="s-v"/>
        <SlideComponent title="" img={courses} description={<p className="descrip">Get trusted information in <p className="statistics-no"> 170 </p> courses.</p>} img_no="3" view="s-v"/>
      </div>
    </div>
  );
};

export default StatisticsView;
