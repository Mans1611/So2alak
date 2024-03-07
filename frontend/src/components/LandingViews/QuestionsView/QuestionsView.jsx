import React from "react";
import "./questionsview.css";
import SlideComponent from "../SlideComponent/SlideComponent";
import answers from "../../../assets/landing/answers.svg";
import inquiries from "../../../assets/landing/inquiries.svg";
import suggestions from "../../../assets/landing/suggestions.svg";

const QuestionsView = () => {
  return (
    <div className="questionview-container" >
      <SlideComponent title="Answers" img={answers} description="The students can share a videos or articles’ link to the student, and
                it will be in the suggestion section for the question." img_no="1" view="q-v"/>
      <SlideComponent title="Inquiries" img={inquiries} description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
          quibusdam et expedita placeat. Iusto voluptate quisquam facilis
          debitis! Sint facilis iste cum soluta optio dolor." img_no="2" view="q-v"/>
      <SlideComponent title="Suggestions" img={suggestions} description="The students can share a videos or articles’ link to the student, and
          it will be in the suggestion section for the question." img_no="3" view="q-v"/>
    </div>
  );
};

export default QuestionsView;
