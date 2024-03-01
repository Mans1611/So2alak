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
    AOS.init({ duration: 2000 });
  }, []);

  const [device, setDevice] = useState(false);

  const detectDevice = () => {
    let deviceType = device;
    if (window.innerWidth < 480) deviceType = true;
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


/*
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        setData(response.data);
        setView(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
   setView("Loading Component");
  }

  if (error) {
    setView({error});
  }
*/


  return (
    <div className="landing-container" onLoad={detectDevice}>
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
      {device ? <Slideshow comps={[
        <SlideComponent title="" img={students} description={<p>Join more than <p className="statistics-no"> + data.sn </p> Students.</p>} />,
        <SlideComponent title="" img={QandA} description={<p>More than <p className="statistics-no"> + data.van </p> question with <span> verified answers</span>.</p>} />,
        <SlideComponent title="" img={courses} description={<p>Get trusted information in more than <p className="statistics-no"> + data.cn </p> courses.</p>} />]} /> : <StatisticsView />}
      {showTopBtn && <div className="go-top" onClick={goTop}>&uarr;</div>}
    </div>
  );
};

export default Landing;
