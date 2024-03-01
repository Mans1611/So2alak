import React from "react";

import "./statisticsview.scss";
import SlideComponent from "../SlideComponent/SlideComponent";
import QandA from "../../../assets/landing/QandA.png";
import courses from "../../../assets/landing/courses.png";
import students from "../../../assets/landing/students.png";

const StatisticsView = (props) => {

  
  return (
    <div className="statisticsview-container" >
      <div className="statistics" >
        <SlideComponent title="" img={students} description={<p>Join more than <p className="statistics-no"> + props.sn </p> Students.</p>} />
        <SlideComponent title="" img={QandA} description={<p>More than <p className="statistics-no"> + props.van </p> question with <span> verified answers</span>.</p>} />
        <SlideComponent title="" img={courses} description={<p>Get trusted information in more than <p className="statistics-no"> + props.cn </p> courses.</p>} />
      </div>
    </div>
  );
};

export default StatisticsView;
