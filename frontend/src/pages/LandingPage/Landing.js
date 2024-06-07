import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

import "./landing.scss";

import MainView from "../../components/LandingViews/MainView/MainView";
/*
import BadgesView from "./../../components/LandingViews/BadgesView/BadgesView";
import QuestionsView from "./../../components/LandingViews/QuestionsView/QuestionsView";
import StatisticsView from "./../../components/LandingViews/StatisticsView/StatisticsView";




import answers from "../../assets/landing/answers.svg";
import inquiries from "../../assets/landing/inquiries.svg";
import suggestions from "../../assets/landing/suggestions.svg";

import QandA from "../../assets/landing/QandA.png";
import courses from "../../assets/landing/courses.png";
*/


//import AOS from "aos";
//import "aos/dist/aos.css";

import logo from "../../assets/logo.png";
import menu from "../../assets/landing/menu.svg";
import close from "../../assets/landing/close.svg";
import StatisticsView from "../../components/LandingViews/StatisticsView/StatisticsView";
import FeaturesView from "../../components/LandingViews/FeaturesView/FeaturesView";

const Landing = () => {

  /*useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);*/

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


  const [img, setImg] = React.useState("close");

  return (
    <div className="landing-container" onLoad={detectDevice}>
      <div className="scroll-bar"></div>
      <nav className="navBar">
        <div className="phone-nav">
          <img src={logo} alt="logo" />
          <img onClick={() => { img === "close" ? setImg("open") : setImg("close") }} src={img === "close" ? menu : close} alt="menu" />
        </div>
        <ul className={`ul ulLeft ${img === "close" ? "" : "ulLeft-open"}`}>
          <li>
            <HashLink smooth to='/landing/#section1' className="link landing-link">
              Features
            </HashLink>
          </li>
          <li>
            <HashLink smooth to='/landing/#section2' className="link landing-link">
              Statistics
            </HashLink>
          </li>
          <li>
            <HashLink smooth to='/landing/#section3' className="link landing-link">
              Badges
            </HashLink>
          </li>
        </ul>
        <ul className="ul ulRight">
          <li>
            <Link className="link sign-link" to="/signin">
              LOGIN
            </Link>
          </li>
          <li>
            <Link className="link sign-link" to="/signup">
              SIGNUP
            </Link>
          </li>
        </ul>
      </nav>
      <div className={`go-top ${showTopBtn ? "visable" : ""}`} onClick={goTop}>&uarr;</div>

      <MainView />

      <div id="section1">
        <FeaturesView />
      </div>

      <div id="section2">
        <StatisticsView />
      </div>



    </div>
  );
};

export default Landing;
