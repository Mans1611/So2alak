import React from "react";
import "./badgesview.css";
import gold from "../../../assets/landing/gold.svg";
import silver from "../../../assets/landing/silver.svg";
import bronze from "../../../assets/landing/bronze.svg";
//import { Link } from "react-router-dom";

const BadgesView = () => {

  return (
    <div className="badgesview-container">
      <h1 className="label">Badges</h1>
      <div className="badges-container">
        <img src={silver} alt="silver" className="silver-badge" />
        <img src={gold} alt="gold" className="gold-badge" />
        <img src={bronze} alt="bronze" className="bronze-badge" />
      </div>
    </div>
  );
};

export default BadgesView;
