import React from "react";
import "./questionsview.css";
import answers from "../../../assets/answers.svg";
import inquiries from "../../../assets/inquiries.svg";
import suggestions from "../../../assets/suggestions.svg";
//import { Link } from "react-router-dom";

const QuestionsView = () => {
  return (
    <div className="questionview-container">
      <div className="answers">
        <h1 className="title">Answers</h1>
        <img src={answers} alt="answers" className="question-img" />
        <p className="question-description">
          The students can share a videos or articles’ link to the student, and
          it will be in the suggestion section for the question.
        </p>
      </div>
      <div className="inquiries">
        <h1 className="title">Inquiries</h1>
        <img src={inquiries} alt="" className="question-img" />
        <p className="question-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
          quibusdam et expedita placeat. Iusto voluptate quisquam facilis
          debitis! Sint facilis iste cum soluta optio dolor.
        </p>
      </div>
      <div className="suggestions">
        <h1 className="title">Suggestions</h1>
        <img src={suggestions} alt="" className="question-img" />
        <p className="question-description">
          The students can share a videos or articles’ link to the student, and
          it will be in the suggestion section for the question.
        </p>
      </div>
    </div>
  );
};

export default QuestionsView;
