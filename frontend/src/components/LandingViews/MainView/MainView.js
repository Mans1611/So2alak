import React, { useEffect } from "react";
import "./mainview.scss";
import phone from "../../../assets/landing/phone.png";
import laptop from "../../../assets/landing/laptop.png";
import phone_bg from "../../../assets/landing/phone-bg.svg";
import laptop_bg from "../../../assets/landing/laptop-bg.svg";
import mainlogo from "../../../assets/landing/SO_alak.svg";
import { Link } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css"; 

const MainView = () => {

  useEffect(()=> {
    AOS.init({duration: 3000});
  }, []);

  return (
    <div className="mainview-container">
      <div className="mianimg-container">
        <div className="laptop" data-aos="fade-left">
          <img className="laptop-bg" src={laptop_bg} alt="laptop" />
          <img className="laptop-img" src={laptop} alt="laptop" />
        </div>
        <div className="phone" data-aos="fade-right">
          <img className="phone-bg" src={phone_bg} alt="phone" />
          <img className="phone-img" src={phone} alt="phone" />
        </div>
      </div>
      <div className="mainview-description">
        <img className="mainlogo" src={mainlogo} alt="mainlogo" />
        <p className="description" data-aos="flip-up">
          College community platform where students are asking their questions
          related to specific course. And their colleagues are being able to
          answer their questions and get a points and reputation.
        </p>
        <div className="signin-signup">
          <Link className="signin" to="/signin">
            Sign In
          </Link>
          <Link className="signup" to="/signup">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainView;
