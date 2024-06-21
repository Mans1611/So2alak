import React from "react";

import "./mainview.scss";

import mainImg from "../../../assets/landing/main-img.png";
import mainlogo from "../../../assets/landing/SO_alak.svg";

//import AOS from "aos";
//import "aos/dist/aos.css";

const MainView = () => {

  /*useEffect(()=> {
    AOS.init({duration: 3000});
  }, []);*/

  return (
    <div className="mainview-container">
      <div className="mainview-description">
        <img className="mainlogo" src={mainlogo} alt="mainlogo" />
        <p className="description" data-aos="flip-up">
          College community platform where students are asking their questions
          related to specific course. And their colleagues are being able to
          answer their questions and get a points and reputation.
        </p>
      </div>
      <div className="mianimg-container">
          <img className="main-img" src={mainImg} alt="main" />
      </div>
    </div>
  );
};

export default MainView;
