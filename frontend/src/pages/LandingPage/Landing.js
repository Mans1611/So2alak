import React, { useEffect, useState } from "react";
import MainView from "../../components/LandingViews/MainView/MainView";
import "./landing.scss";
import BadgesView from "./../../components/LandingViews/BadgesView/BadgesView";
import QuestionsView from "./../../components/LandingViews/QuestionsView/QuestionsView";
import StatisticsView from "./../../components/LandingViews/StatisticsView/StatisticsView";


import Slideshow from "./../../components/Slideshow/Slideshow";
import SlideComponent from "../../components/LandingViews/SlideComponent/SlideComponent";

import answers from "../../assets/landing/answers.svg";
import inquiries from "../../assets/landing/inquiries.svg";
import suggestions from "../../assets/landing/suggestions.svg";

import QandA from "../../assets/landing/QandA.png";
import courses from "../../assets/landing/courses.png";
import students from "../../assets/landing/students.png";

import AOS from "aos";
import "aos/dist/aos.css";

const Landing = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [device, setDevice] = useState(false);

  const detectDevice = () => {
    let deviceType = device;
    if (window.innerWidth < 600) deviceType = true;
    else deviceType = false;
    setDevice(deviceType);
  }

  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div className="landing-container" onLoad={detectDevice}>

      <div className="scroll-bar"></div>

      <MainView />
      {device ? <Slideshow comps={[
        <SlideComponent title="Answers" img={answers} description="The students can share a videos or articles’ link to the student, and
                it will be in the suggestion section for the question."/>,
        <SlideComponent title="Inquiries" img={inquiries} description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
                quibusdam et expedita placeat. Iusto voluptate quisquam facilis
                debitis! Sint facilis iste cum soluta optio dolor."/>,
        <SlideComponent title="Suggestions" img={suggestions} description="The students can share a videos or articles’ link to the student, and
                it will be in the suggestion section for the question."/>]} /> : <QuestionsView />}
      <BadgesView />
      {
        device ? <Slideshow comps={[
          <SlideComponent title="" img={students} description={<p>Join more than <p className="statistics-no"> +10000 </p> Students.</p>} />,
          <SlideComponent title="" img={QandA} description={<p>More than <p className="statistics-no"> +1000 </p> question with <span> verified answers</span>.</p>} />,
          <SlideComponent title="" img={courses} description={<p>Get trusted information in <p className="statistics-no"> 170 </p> courses.</p>} />]} /> : <StatisticsView />
      }
      <div className={`go-top ${showTopBtn ? "visable" : ""}`} onClick={goTop}>&uarr;</div>
    </div>
  );
};

export default Landing;
