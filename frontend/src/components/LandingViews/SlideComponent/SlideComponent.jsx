import React from "react";
import "./slidecomponent.scss";




const SlideComponent = (props) => {

    return (
        <div className="slider">
            <h1 className="title">{props.title}</h1>
            <img src={props.img} alt="img" className="question-img" />
            <p className="question-description">
                {props.description}
            </p>
        </div>
    );
};

export default SlideComponent;