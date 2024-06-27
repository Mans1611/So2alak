import React, { createContext, useContext, useEffect, useState } from 'react'
import './sidebar.scss';
import axios from 'axios';
import { AppState } from '../../App';
import { useParams,Link, useNavigate, useSearchParams } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import Portal from '../../Portal/Portal';
import ImagePreview from '../../Portal/ImagePreview/ImagePreview';
import PersonalDetail from '../PersonalDetail/PersonalDetail';

export const ProfileContext = createContext(null);

const SideBar = React.memo(() => {
  const [loading,setLoading]=useState(false);
  const nav = useNavigate()
  const {dark,
    sidebarSelected,setSideBarSelected,
    stundetInfo,
    user_courses, setUserCourses,
    isTeacher
  } = useContext(AppState);

  const link = window.location.href;
  const {user_id} = useParams();
  const [profilePage,setProfilePage] = useState(false);
  const [courseImg,setCourseImg] = useState({show:false,img_url:null});
  const {course_code} = useParams();
  useEffect(()=>{
    const fetchCourses = async ()=>{
      setLoading(true);
      try{
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/person/getStudentCourses/${stundetInfo.username?stundetInfo.username:'Ahmed'}`)
        setUserCourses(result?.data?.data)
      }catch(err){
        console.log(err)
      }finally{
        setLoading(false);
      }
    }

    if (link.includes('profile')){
      setProfilePage(true);
    }
    else{
      setProfilePage(false);
      if(user_courses.length===0)
        fetchCourses();
    }
    const selected = user_courses.find((course)=> course.course_id === course_code)
    if(selected){
      setCourseImg({show:true,img_url:selected.img_url})
    }else{
      setCourseImg({show:false,img_url:null})
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
  let [searchParams] = useSearchParams();
  const username = searchParams.get('username');
  const student_id = searchParams.get('student_id');
  const [userData,setUserData] = useState({});
  const [otherProfile,setOtherProfile] = useState(false);
  const [userDetails,setUserDetails] = useState({});

  useEffect(()=>{
    const fetchPerson = async()=>{
      try{
        const {data,statuts} = await axios.get(`${process.env.REACT_APP_API_URL}/person/getfulldata/${username}`)
        if(statuts === 200){
          setUserData(data);
        }
      }catch(err){
        console.log(err);
      }
    }
    if(link.includes('profile')&&stundetInfo.username !== username){
      setOtherProfile(true);
      fetchPerson();
    }else{
      setOtherProfile(false);
    }
  },[link])
  return (
    <ProfileContext.Provider value={{userDetails,setUserDetails}}>
      <div className={`sidebar ${dark?'dark':''}`}>
        <div className="sidebar-logo">
          {
            profilePage ?
            <div className="profile_img">
              <label htmlFor="profile_img">
                {!otherProfile && <EditIcon className='edit'/>}
              </label>
              <input accept='image/*'onChange={handleImageUpload} type="file" name="" id="profile_img" />
              
              {
                !otherProfile?
                stundetInfo?.img_url? <img className='profile-img' src={stundetInfo.img_url}/>:<PersonIcon className='person'/>:
                userData?.img_url? <img className='profile-img' src={userData.img_url}/>:<PersonIcon className='person'/>
              }
              
            </div>
            :
            courseImg.show?
            <img  src={courseImg.img_url}/>
            :
            <i className="fi fi-sr-home"></i>
            
          }
        </div>
        <hr/>
        {!isTeacher&&profilePage && <PersonalDetail user_id={student_id}/>}
          {!isTeacher && 
            <div className="side-bar-items">
              <h2 className='title'>You</h2>
              <ul className='list'>
              <Link onClick={()=>handleActive('My Lists')} to={`lists/${otherProfile? userDetails.student_id : stundetInfo.student_id}`}>
                <li className={`items  ${(sidebarSelected?.includes('Lists'))?'active':''}`}>
                  <i className="fi fi-sr-home"></i>
                  {
                    profilePage&&otherProfile ? `${userDetails.username?.slice(0,10)}'s Lists`:
                    'My Lists'
                  }
                  </li>
              </Link>
              <Link  onClick={()=>handleActive('My Questions')} to={`myquestions/${otherProfile? userDetails.username : stundetInfo.username}`}>
                <li  className={`items  ${(sidebarSelected?.includes('Questions'))?'active':''}`}>
                  <i className="fi fi-sr-messages-question"></i>
                  {
                    profilePage&&otherProfile ? `${userDetails.username?.slice(0,10)}'s Questions`:
                    'My Questions'
                  }
                  </li>
              </Link>
              <Link  onClick={()=>handleActive('My Answers')} to={`myanswers/${otherProfile? userDetails.username : stundetInfo.username}`}>
                <li className={`items  ${(sidebarSelected?.includes('Answers'))?'active':''}`}>
                    <i className="fi fi-sr-answer"></i>
                    {
                    profilePage&&otherProfile ? `${userDetails.username?.slice(0,10)}'s Answers`:
                    'My Answers'
                  }
                </li>
              </Link>
            
              </ul>
              <hr/>
        </div>
        }
          <div className="side-bar-items">
              <h2 className='title'>Your Courses</h2>
              <ul className='list'>
        {
          loading? 
            <LoadingCourses/>
            :
            <>
            {user_courses.length === 0 && 
              <div className='NoCourses'>
                <p>You have Not Register any course yet</p>
                <button className='nav-register' onClick={NavToRegister}>Register Now</button>
              </div>
            }
              {user_courses.map((course,id)=>
              <Link key={id} to={`${course.course_id}`}>
                  <li key={course.course_id} onClick={()=>handleActive(course.course_id)} className={`items ${
                    (sidebarSelected === course.course_id)?'active':''}`}>{course.course_name}
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
    </ProfileContext.Provider>
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
