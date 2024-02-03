import React from 'react'
import './about.scss';
import abdullah from '../../assets/abdullah.png';
import mans from '../../assets/mans.png';
import omar from '../../assets/omar.png';
import mostafa from '../../assets/mostafa.png';
import curve from '../../assets/about_curve.svg'
import Person from '../../components/Person/Person';
const About = () => {
    document.title = 'About Us'
  return (
    <div className='about-page'>
        <div className="our-photos-wrapper">
            <h1 className='team-title'>OUR TEAM</h1>
            <div className="flex">
                <Person name="Mansour Mohamed" img ={mans}/>
                <Person name="Mostafa Abdelal" img ={mostafa} middle={true}/>
                <Person name="AbdAllah Mostafa" img ={abdullah} middle={true}/>
                <Person name="Omar Rehan" img ={omar}/>
                
            </div>
            <img src={curve} className='curve' alt="" srcset="" />
        </div>
        <div className="details-container">
            
        </div>
    </div>
  )
}

export default About