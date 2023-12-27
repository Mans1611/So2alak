import React from "react";
import MainView from "../../components/LandingViews/MainView/MainView";
import "./landing.css";
import BadgesView from "./../../components/LandingViews/BadgesView/BadgesView";
import QuestionsView from "./../../components/LandingViews/QuestionsView/QuestionsView";

const Landing = () => {
  return (
    <div className="landing-container">
      <MainView />
      <QuestionsView />
      <BadgesView />
    </div>
  );
};

export default Landing;
