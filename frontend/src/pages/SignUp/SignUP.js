import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.scss"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import logo from "../../assets/Logo(122)5.png";
// import axios from 'axios';
import { levDeps } from '../../data/LevelsDepartments';
import { AppState } from '../../App';
import axios from 'axios'
/* comments : 
    - delete states like passwordAlarm, rePasswordLength state.  ==> solved
    - I moved (username,id) state in app context, as i need it in welcome page and all other pages,
    so it better if it in AppState (context).
    - When I select Somophore no department appears   ==> solved
*/  


/*

*/ 

const SignUP = () => {
    document.title = 'SignUp' // for naming the page the tab.
    const navigate = useNavigate(); // to navigate to anotehr page
    const bttnRef = useRef(null); //button ref

    //states
    const {setUserCourses,setIsTeacher,setStudentInfo,setAuth} = useContext(AppState);
    const levels = ['Freshmen', 'Somophore', 'Junior', 'Senior1', 'Senior2'];
    const departments = levDeps;
    
    const [username, setUsername] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [level, setLevel] = useState('');
    const [department, setDepartment] = useState('');
    const [subdepartment, setSubdepartment] = useState('');
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleRepassword, setVisibleRepassword] = useState(false);
    const [type, setType] = useState("");
    const [title, setTitle] = useState("Doctor"); // this for teacher even a teacher or a teacher assistant.
    
    //alarms
    const [userNameAlarm, setUserNameAlarm] = useState({ show: false, msg: "" });
    const [idAlarm, setIdAlarm] = useState({ show: false, msg: "" });
    const [passwordAlarm, setPasswordAlarm] = useState({ show: false, msg: "" });
    const [repasswordAlarm, setRepasswordAlarm] = useState({ show: false, msg: "" });
    const [levelAlarm, setLevelAlarm] = useState({ show: false, msg: "" });
    const [departmentAlarm, setDepartmentAlarm] = useState({ show: false, msg: "" });
    const [subdepartmentAlarm, setSubdepartmentAlarm] = useState({ show: false, msg: "" });

    //arrays used to handle submit
    const primaryStates = [username, id, password, repassword, level];
    const secondaryStates = [department, subdepartment];
    const alarms = [userNameAlarm.show,
        idAlarm.show, passwordAlarm.show, repasswordAlarm.show,
        levelAlarm.show, departmentAlarm.show, subdepartmentAlarm.show];

    // handlers
    const handleUsernameAlarm = () => {
        if (username.length === 0)
            setUserNameAlarm({ show: true, msg: "Enter your username" });
        // setUserNameAlarm()
        else if (username.length < 2)
            setUserNameAlarm({ show: true, msg: "At least 2 characters" });
        else if (username.match(/.* .*/i))
            setUserNameAlarm({ show: true, msg: "Must have no spaces" });
        else if (username.match(/[^a-z0-9]/i))
            setUserNameAlarm({ show: true, msg: "Just letters and numbers" });
        else if (!isNaN(username))
            setUserNameAlarm({ show: true, msg: "Must have at least 1 letter" });
        else if (username[0].match(/[^a-z]/i)) {
            setUserNameAlarm({ show: true, msg: "Fist character must be a letter" });
        }
    };

    const handleIdAlarm = () => {
        if (id.match(/\d\d(\d|p|q|t|w)\d\d\d\d/i)) {
            setType("student");
        } else if (id.match(/^(?![0-9])[a-zA-Z].*$/)) {
            setType("Doctor");
        }

        if (id === '') {
            setIdAlarm({ show: true, msg: "Enter your id" });
        } else if (!id.match(/\d\d(\d|p|q|t|w)\d\d\d\d/i) && !id.match(/^(?![0-9])[a-zA-Z].*$/) && type !== 'Doctor') {
            setIdAlarm({ show: true, msg: "Enter a valid id" });
        }
    };

    const handlePasswordAlarm = () => {
        if (password.length === 0) {
            setPasswordAlarm({ show: true, msg: "Enter your password" });
        } else if (password.length < 8) {
            setPasswordAlarm({ show: true, msg: "Minimum 8 characters" });
        } else if (repassword !== '' && (password !== repassword)) {
            setRepasswordAlarm({ show: true, msg: "Confirm your password" });
        } else if (password === repassword) {
            setRepasswordAlarm({ show: false, msg: "" });
        }
    };

    const handlePasswordChange = (value) => {
        if (value === repassword || repassword === '') {
            setRepasswordAlarm({ show: false, msg: "" });
        } else if (value !== repassword && repassword !== '') {
            setRepasswordAlarm({ show: true, msg: "Confirm your password" });
        }
    };

    const handleRepasswordAlarm = (e) => {
        if (passwordAlarm.show) {
            return;
        } else if (repassword !== password) {
            setRepasswordAlarm({ show: true, msg: "Confirm your password" });
        }
    };

    const handleLevelAlarm = () => {
        if (level === '') {
            setLevelAlarm({ show: true, msg: "Select your level" });
        }
    };

    const handleDepartmentAlarm = () => {
        if (department === '') {
            setDepartmentAlarm({ show: true, msg: "Select your department" });
        }
    };

    const handleSubdepartmentAlarm = () => {
        if (subdepartment === '') {
            setSubdepartmentAlarm({ show: true, msg: "Select your sub-department" });
        }
    };

    const handleHoverDisable = () => {
        if (type ==='Doctor' && department !== '' && subdepartment!=='')
            return 
        else if (primaryStates.includes("")) {
            bttnRef.current.disabled = true;
        } else if (level === 'Junior' || level === 'Senior1' || level === 'Senior2') {
            if (secondaryStates.includes('')) {
                bttnRef.current.disabled = true;
            }
        }
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        if ( !alarms.includes(true) && 
            ( !primaryStates.includes("") || (level === "" && type === "Doctor") ) &&
            ((level === 'Junior' || level === 'Senior1' || level === 'Senior2') ?
                ((secondaryStates.includes('')) ? false : true) : 
                (level === "" && type === "Doctor") ? ((secondaryStates.includes('')) ? false : true) : true) ) {

           
           
            try{
                //send a request to backend.
                if(type==='student'){
                    const result = await axios.post(`${process.env.REACT_APP_API_URL}/person/signup`,
                    {
                        username,
                        student_id: id,
                        password,
                        studnet_level: level,
                        student_department: department,
                        student_subdepartment: subdepartment
                    })
                    console.log(result)
                    if(result.status === 201){
                        setUserCourses(result.data.sugesstedCourses); // here I set the default courses for the student, which comes from server
                        console.log(result.data)
                        setStudentInfo(result.data.data);
                        setAuth(true)
                        navigate('/welcome'); // then navigate to welcome page. 
                    }
                }
                else{
                    const result = await axios.post(`${process.env.REACT_APP_API_URL}/teacher/signup`,{
                        username,
                        id,
                        password,
                        department,
                        title,
                        subdepartment,
                    })
                    if(result.status === 201){
                        setIsTeacher(true);
                        setStudentInfo(result.data.data);
                        setAuth(true)
                        navigate('/welcome'); // then navigate to welcome page. 
                    }
                }
            }catch(error){
                // handle error coming from api
                console.log(error)
                if(error?.response?.data.msg){
                    setIdAlarm({show:true,msg:error.response.data.msg})
                }
            }

        }
    };
    const handleIdInput = (e)=>{
        if (e.target.value.match(/\d\d(\d|p|q|t|w)\d\d\d\d/i)) {
            setType("student");
        } else if (e.target.value.match(/^[a-zA-Z]+$/)) {
            setType("Doctor");
        }

        setId(e.target.value);
    }
    return (
        <>
            <div className='signup-container'>
                <div className='signup-left'>
                    <img className='logo-left' src={logo} alt='' />
                </div>
                <div className='signup-right'>
                    <form autoComplete='off' onSubmit={handleSubmit}>
                        <img className='logo-right' src={logo} alt='' />
                        <h1>Create Account</h1>
                        <h5>sign up and join our collaborative community!</h5>

                        <input className={`${userNameAlarm.show ? "in user invalid" : "in user"}`}
                            value={username} name='username' type="text" placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                            onFocus={() => { setUserNameAlarm({ show: false, msg: "" }); }}
                            onBlur={handleUsernameAlarm}>
                        </input>
                        {userNameAlarm.show && <div className='alarm-container'><p className='alarm'>*{userNameAlarm.msg}!</p></div>}

                        {/* ----------------------id----------------------------- */}
                        <div className='id-container'>
                            <input className={idAlarm.show ? "in id invalid" : "in id"}
                                value={id} name='id' type="text" placeholder='ID' maxLength={type === 'student' && "7"}
                                onChange={handleIdInput} onBlur={handleIdAlarm}
                                onFocus={() => {setIdAlarm({ show: false, msg: "" }); setType("") }}>
                            </input>
                            <p className={idAlarm.show ? "invalid" : "at"}>@eng.asu.edu.eg</p>
                        </div>
                        {idAlarm.show && <div className='alarm-container'><p className='alarm'>*{idAlarm.msg}!</p></div>}

                        {/* ----------------------password----------------------------- */}
                        <div className='password-container'>
                            <input className={passwordAlarm.show ? "in pass invalid" : "in pass"}
                                value={password} name='password' type={visiblePassword ? "text" : "password"} placeholder='Password'
                                onChange={(e) => { setPassword(e.target.value); handlePasswordChange(e.target.value); }}
                                onFocus={() =>  setPasswordAlarm({ show: false, msg: "" }) }
                                onBlur={handlePasswordAlarm}>
                            </input>
                            {visiblePassword ? <VisibilityOffIcon className='eye' 
                            onClick={() => setVisiblePassword(!visiblePassword)} />
                                : <VisibilityIcon className='eye' onClick={() => setVisiblePassword(!visiblePassword)} />}
                        </div>
                        {passwordAlarm.show ? 
                            <div className='alarm-container'><p className='alarm'>*{passwordAlarm.msg}!</p></div> : null}

                        <div className='password-container'>
                            <input className={repasswordAlarm.show ? "in pass invalid" : "in pass"}
                                value={repassword} type={visibleRepassword ? "text" : "password"} placeholder='Re-Password'
                                onChange={(e) => setRepassword(e.target.value)}
                                onFocus={() => setRepasswordAlarm({ show: false, msg: "" })}
                                onBlur={handleRepasswordAlarm}>
                            </input>
                            {visibleRepassword ? <VisibilityOffIcon className='eye' 
                            onClick={() => setVisibleRepassword(!visibleRepassword)} />
                                : <VisibilityIcon className='eye' onClick={() => setVisibleRepassword(!visibleRepassword)} />}
                        </div>
                        {repasswordAlarm.show && 
                            <div className='alarm-container'><p className='alarm'>*{repasswordAlarm.msg}!</p></div>}


                        {(type === "student") && 
                        <>
                            <select className={level === '' ? (levelAlarm.show ? "in invalid holder" : "in holder") :
                                (levelAlarm.show ? "in invalid" : "in")}
                                value={level} onChange={(e) => setLevel(e.target.value)} onBlur={handleLevelAlarm}
                                onFocus={() => setLevelAlarm({ show: false, msg: "" }) }>
                                <option value="" disabled selected hidden >
                                    Select Your Level
                                </option>
                                {levels.map(lev => (<option value={lev}>{lev}</option>))}
                            </select>
                            {levelAlarm.show && <div className='alarm-container'><p className='alarm'>*{levelAlarm.msg}!</p></div>}
                        </>
                        }

                        {/*  departments (Electrical - Civil - Mechanical) */}
                        {
                            (level === 'Junior' || level === 'Senior1' || level === 'Senior2' || level === 'Somophore' ||
                            (level === "" && type === "Doctor")) &&
                            (
                                <>
                                    <select className={department === '' ? (departmentAlarm.show ? "in invalid holder" : "in holder") :
                                        (departmentAlarm.show ? "in invalid" : "in")}
                                        value={department} onChange={(e) => { setDepartment(e.target.value); setSubdepartment(''); }}
                                        onBlur={handleDepartmentAlarm}
                                        onFocus={() => setDepartmentAlarm({ show: false, msg: "" }) }>
                                        <option value="" disabled selected hidden >
                                            Select Your Department
                                        </option>
                                        {departments.map(dep => (<option value={dep.department}>{dep.department}</option>))}
                                    </select>
                                    {departmentAlarm.show && 
                                        <div className='alarm-container'><p className='alarm'>*{departmentAlarm.msg}!</p></div>}
                                </>
                            )
                        }

                        {/* Sub departments (Elctronics - Computer - Power) */}
                        {
                            // condition
                            ((level === 'Junior' || level === 'Senior1' || level === 'Senior2' || 
                            (level === "" && type === "Doctor")) && (department === 'Electrical'
                                || department === 'Mechanical' || department === 'Civil' || department === 'Architectural')) &&

                            (
                                <>
                                    <select className={subdepartment === '' ? 
                                    (subdepartmentAlarm.show ? "in invalid holder" : "in holder") :
                                        (subdepartmentAlarm.show ? "in invalid" : "in")}
                                        value={subdepartment} onChange={(e) => setSubdepartment(e.target.value)} 
                                        onBlur={handleSubdepartmentAlarm}
                                        onFocus={() =>  setSubdepartmentAlarm({ show: false, msg: "" }) }>
                                        <option value="" disabled selected hidden >
                                            Select Your Sub-Department
                                        </option>

                                        {departments.filter((dep) => { return dep.department === department })[0].subDep
                                            .map(sub => (<option value={sub.id}>{sub.name}</option>))}
                                    </select>
                                    {subdepartmentAlarm.show &&
                                        <div className='alarm-container'><p className='alarm'>*{subdepartmentAlarm.msg}!</p></div>}
                                </>
                            )
                        }
                        {
                            type === 'Doctor' && 
                            <select value ={title} onChange={(e)=>setTitle(e.target.value)} className='in holder'>
                                <option value={'Doctor'}>Doctor</option>
                                <option value={'TA'}>TA</option>
                            </select>
                        }

                        <button className='signup-button' type='submit' disabled={alarms.includes(true)} ref={bttnRef}
                            onMouseOver={handleHoverDisable}
                            onMouseLeave={() => { if (!alarms.includes(true)) { bttnRef.current.disabled = false; } }}>Sign Up</button>
                        <p className='signin-forward'>Already have an account? <Link to='/signin'>Sign In</Link></p>
                    </form>
                </div >
            </div >
        </>
    )
}
export default SignUP

