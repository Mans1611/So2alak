import React, { useContext, useEffect, useState } from 'react'
import './sidebar.scss';
import axios from 'axios';
import { AppState } from '../../App';
import { useParams,Link, useNavigate } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import Portal from '../../Portal/Portal';
import ImagePreview from '../../Portal/ImagePreview/ImagePreview';
import PersonalDetail from '../PersonalDetail/PersonalDetail';

const SideBar = React.memo(() => {
  const [loading,setLoading]=useState(true);
  const nav = useNavigate()
  const {dark,
    sidebarSelected,setSideBarSelected,
  stundetInfo,
    studentCourses,setStuCourses} = useContext(AppState);
    const {course_code} = useParams();
    const {user_id} = useParams();

  const link = window.location.href;
  
  const [profilePage,setProfilePage] = useState(false);
  
  useEffect(()=>{
    const fetchCourses = async ()=>{
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/person/getStudentCourses/${stundetInfo.username?stundetInfo.username:'Ahmed'}`)
      setStuCourses(result.data.data)
      setLoading(false);
    }
    if (link.includes('profile')){
      setProfilePage(true);
    }
    else{
      
      setProfilePage(false);
      fetchCourses();
    }
  },[link]);

  const handleActive=(selected)=>{
      setSideBarSelected(selected)
  }
  const NavToRegister = ()=>{
    nav('/welcome');
  }

  const [profileImg,setImgProfile] = useState(null);
  const [imgFile,setImgFile]=useState(null);
  const handleImageUpload = (e)=>{
    const file = e.target.files[0];
    setImgFile(file)
    const reader = new FileReader();
    
    reader.onload=(event)=>{
      const img = new Image();
      img.onload=()=>{
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const width = 200; // Example width
        const height = 200; // Example height
        canvas.width = width;
        canvas.height = height;
        // Draw image on canvas with desired crop
        const sourceX = 0; // Example X coordinate for crop
        const sourceY = 0; // Example Y coordinate for crop
        const sourceWidth = img.width; // Full image width
        const sourceHeight = img.height; // Full image height
        ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);

        // Convert canvas content to Blob
        canvas.toBlob((blob) => {
          // Handle the resized and cropped image blob here
        }, 'image/jpg', 0.9); // Adjust quality if needed
      };
        img.src = event.target.result;
        setImgProfile(event.target.result)

    }
    
    if(file)
      reader.readAsDataURL(file);
    
  }
  return (
    <div className={`sidebar ${dark?'dark':''}`}>
      <div className="sidebar-logo">
        {
          profilePage?
          <div className="profile_img">
            <label htmlFor="profile_img">
              <EditIcon className='edit'/>
            </label>
            <input accept='image/*'onChange={handleImageUpload} type="file" name="" id="profile_img" />
            <PersonIcon className='person'/>
          </div>
          :
          <i className="fi fi-sr-home"></i>
        }
      </div>
        <div className='username'>Username :</div>
      <hr/>
      {profilePage && <PersonalDetail user_id={user_id}/>}
      

        <div className="side-bar-items">
          <h2 className='title'>You</h2>
          <ul className='list'>
          <Link to={`lists/${stundetInfo.student_id}`}>
            <li className='items'>
              <i className="fi fi-sr-home"></i>
                My List
              </li>
          </Link>
            <li className='items'>
              <i className="fi fi-sr-messages-question"></i>
                My Questions
              </li>
            <li className='items'>
                <i className="fi fi-sr-answer"></i>
                My Answers
            </li>
        
          </ul>
      </div>
      <hr/>
        <div className="side-bar-items">
            <h2 className='title'>Your Courses</h2>
            <ul className='list'>
      {
        loading? 
          <LoadingCourses/>
          :
          <>
          {studentCourses.length === 0 && 
            <div className='NoCourses'>
              <p>You have Not Register any course yet</p>
              <button className='nav-register' onClick={NavToRegister}>Register Now</button>
            </div>
          }
             {studentCourses.map((course,id)=>
             <Link key={id} to={`${course.course_id}`}>
                <li key={course.course_id} onClick={()=>handleActive(course.course_id)} className={`items ${
                  ( sidebarSelected === course.course_id)?'active':''}`}>{course.course_name}
                  </li>
              </Link>
             )}
          </>
            }
            </ul>
        </div>
        {
          profileImg &&
          <Portal children={<ImagePreview setImgProfile={setImgProfile} imgFile={imgFile} setProfileImage={setImgProfile} img={profileImg}/>}/>
        }
    </div>
  )
})

const LoadingCourses = ()=>
  (
        <>
          <div className="loading-card"></div>
          <div className="loading-card"></div>
          <div className="loading-card"></div>              
        </>
  )


export default SideBar;
