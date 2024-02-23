import React, { useState } from 'react'
import './about.scss';
import abdullah from '../../assets/abdullah.png';

import mans from '../../assets/mans.png';
import omar from '../../assets/omar.png';
import mostafa from '../../assets/mostafa.png';
import curve from '../../assets/about_curve.svg'
import Person from '../../components/Person/Person';
import { team_members } from '../../data/Team_member_Data';

const Modal = ({ showModal, closeModal,selected_member }) => {
    console.log(selected_member)
    return (
      <div className={`modal-overlay ${showModal ? 'show' : ''}`} onClick={()=>closeModal(false)}>
        
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="photo-wrapper">
                <img src={selected_member.active_img}  srcset="" />
            </div>
            <div className="info-wrapper">
                <h1 className='person-name'>
                    {selected_member.name}
                </h1>
                <h2 className='person-title'>{selected_member.title}</h2>
                <p className='bio'>{selected_member.bio}</p>
            </div>
        </div>
      </div>
    );
};

const About = () => {
    document.title = 'About Us';
    const [showPersonModal,setShowPersonModal] = useState(false)
    const [selected_member,setSelected] = useState({})
    
  return (
    <div className='about-page'>
        <div className="our-photos-wrapper">
            <h1 className='team-title'>OUR TEAM</h1>
            <div className="flex">
                {
                    team_members.map((member,key)=>
                    <Person name = {member.name} 
                            img = {member.img} 
                            middle = {member.middle}
                            id={key}
                            setShowModal = {setShowPersonModal} 
                            setSelected = {setSelected} 
                            />)
                }
            </div>
            <img src={curve} className='curve' alt="" srcset="" />
        </div>
        <div className="details-container">
            
        </div>
        <Modal showModal={showPersonModal} selected_member ={selected_member} closeModal={setShowPersonModal} />
    </div>
  )
}

export default About