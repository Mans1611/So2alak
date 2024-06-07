import React from 'react';

import "./featuresview.scss";

import answers from "../../../assets/landing/answers.svg";
import inquiries from "../../../assets/landing/inquiries.svg";
import suggestions from "../../../assets/landing/suggestions.svg";

function FeaturesView() {
   return (
      <div className='features-container'>
         <div className='features'>
         <div className='feature answers'>
            <h1>Answers</h1>
            <img src={answers} alt='answers' />
            <p className='description'>
               The students can share a videos or articles’ link to the student, and it will be in the suggestion section for the question
            </p>
         </div>
         <div className='feature inquiries'>
            <h1>Inquiries</h1>
            <img src={inquiries} alt='inquiries' />
            <p className='description'>
               The students can share a videos or articles’ link to the student, and it will be in the suggestion section for the question
            </p>
         </div>
         <div className='feature suggestion'>
            <h1>Suggestion</h1>
            <img src={suggestions} alt='suggestion' />
            <p className='description'>
               The students can share a videos or articles’ link to the student, and it will be in the suggestion section for the question            </p>
         </div>
         </div>
      </div>
   )
}

export default FeaturesView;
