import React from "react";
import "./slidecomponent.css";




const SlideComponent = (props) => {
    return (
        <div className="slider">
            <h1 className={`title ${props.title === "" ? "hide-title" : ""}`}>{props.title}</h1>
            <img src={props.img} alt="img" className={`question-img ${props.view} img${props.img_no}`} />
            <p className={`question-description ${props.view}`}>
                {props.description}
            </p>
        </div>
    );
};

export default SlideComponent;