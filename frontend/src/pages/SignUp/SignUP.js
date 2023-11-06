import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom";
import "./SignUp.scss"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import logo from "../../assets/Logo(122)5.png";
import axios from 'axios';
import { levDeps } from '../../data/LevelsDepartments';

const SignUP = () => {
    const levels = ['Freshmen', 'Sophomore', 'Junior', 'Senior1', 'Senior2'];
    const departments = levDeps;

    const bttnRef = useRef(null);

    const [username, setUsername] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [level, setLevel] = useState('');
    const [department, setDepartment] = useState('');
    const [subdepartment, setSubdepartment] = useState('');
    // too many variables
    const [userNameAlarm, setUserNameAlarm] = useState({ show: false, msg: "" });


    const [idRequiredAlarm, setIdRequiredAlarm] = useState(false);
    const [idLengthAlarm, setIdLengthAlarm] = useState(false);
    const [idInvalidAlarm, setIdInvalidAlarm] = useState(false);

    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleRepassword, setVisibleRepassword] = useState(false);

    const [passwordRequiredAlarm, setPasswordRequiredAlarm] = useState(false);
    const [passwordLengthAlarm, setPasswordLengthAlarm] = useState(false);
    const [repasswordAlarm, setRepasswordAlarm] = useState(false);

    const [levelRequiredAlarm, setLevelRequiredAlarm] = useState(false);
    const [departmentRequiredAlarm, setDepartmentRequiredAlarm] = useState(false);
    const [subdepartmentRequiredAlarm, setSubdepartmentRequiredAlarm] = useState(false);

    const primaryStates = [username, id, password, repassword, level];
    const secondaryStates = [department, subdepartment];

    const alarms = [userNameAlarm,
        idRequiredAlarm, idLengthAlarm, idInvalidAlarm, passwordRequiredAlarm, passwordLengthAlarm, repasswordAlarm,
        levelRequiredAlarm, departmentRequiredAlarm, subdepartmentRequiredAlarm];

    //const usernameAlarms = [usernameRequiredAlarm];

    const idAlarms = [idRequiredAlarm, idLengthAlarm, idInvalidAlarm];

    const passwordAlarms = [passwordLengthAlarm, passwordRequiredAlarm];

    const handleUsernameAlarm = () => {
        // here i put the msg error depend on the error type such as (empty, invalid or number, etc...)
        // i will set the msg depend on error
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
            setUserNameAlarm({ show: true, msg: "fist character must be a letter" });
        }
    };

    const handleIdAlarm = () => {
        if (id === '') {
            setIdRequiredAlarm(true);
        } else if (id.length !== 7) {
            setIdLengthAlarm(true);
        } else if (!id.match(/\d\d(\d|p|q|t|w)\d\d\d\d/i)) {
            setIdInvalidAlarm(true);
        }
    };

    const handlePasswordAlarm = () => {
        if (password.length === 0) {
            setPasswordRequiredAlarm(true);
        } else if (password.length < 8) {
            setPasswordLengthAlarm(true);
        } else if (repassword !== '' && (password !== repassword)) {
            setRepasswordAlarm(true);
        } else if (password === repassword) {
            setRepasswordAlarm(false);
        }
    };

    const handlePasswordChange = (value) => {
        if (value === repassword) {
            setRepasswordAlarm(false);
        } else if (value !== repassword && repassword !== '') {
            setRepasswordAlarm(true);
        }
    };

    const handleRepasswordAlarm = (e) => {
        if (passwordLengthAlarm || passwordRequiredAlarm) {
            return;
        } else if (repassword !== password) {
            setRepasswordAlarm(true);
        }
    };

    const handleLevelAlarm = () => {
        if (level === '') {
            setLevelRequiredAlarm(true);
        }
    };

    const handleDepartmentAlarm = () => {
        if (department === '') {
            setDepartmentRequiredAlarm(true);
        }
    };

    const handleSubdepartmentAlarm = () => {
        if (subdepartment === '') {
            setSubdepartmentRequiredAlarm(true);
        }
    };

    const handleHoverDisable = () => {
        if (primaryStates.includes("")) {
            bttnRef.current.disabled = true;
        } else if (level === 'Junior' || level === 'Senior1' || level === 'Senior2') {
            if (secondaryStates.includes('')) {
                bttnRef.current.disabled = true;
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!alarms.includes(true) && !primaryStates.includes("") &&
            ((level === 'Junior' || level === 'Senior1' || level === 'Senior2') ?
                ((secondaryStates.includes('')) ? false : true) : true)) {
            alert('أنت رجل محترم');
            //send a request to backend.
            const result = await axios.post('http://localhost:8000/person/signup',
                {
                    username,
                    student_id: id,
                    password,
                    studnet_level: level,
                    student_department: department,
                    student_subdepartment: subdepartment
                })
            console.log(result)
        }
    };
    return (
        <>
            <div className='signup-container'>
                <div className='signup-left'>
                    <img className='logo-left' src={logo} alt='' />
                </div>
                <div className='signup-right'>
                    <form onSubmit={handleSubmit}>
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


                        <div className='id-container'>
                            <input className={idAlarms.includes(true) ? "in id invalid" : "in id"}
                                value={id} name='id' type="text" placeholder='ID' maxLength="7"
                                onChange={(e) => setId(e.target.value)} onBlur={handleIdAlarm}
                                onFocus={() => { setIdLengthAlarm(false); setIdInvalidAlarm(false); setIdRequiredAlarm(false); }}>
                            </input>
                            <p className={idAlarms.includes(true) ? "invalid" : "at"}>@eng.asu.edu.eg</p>
                        </div>
                        {idLengthAlarm && <div className='alarm-container'><p className='alarm'>*Must be 7 characters!</p></div>}
                        {idInvalidAlarm && <div className='alarm-container'><p className='alarm'>*Enter a valid id!</p></div>}
                        {idRequiredAlarm && <div className='alarm-container'><p className='alarm'>*Enter your id!</p></div>}

                        <div className='password-container'>
                            <input className={passwordAlarms.includes(true) ? "in pass invalid" : "in pass"}
                                value={password} name='password' type={visiblePassword ? "text" : "password"} placeholder='Password'
                                onChange={(e) => { setPassword(e.target.value); handlePasswordChange(e.target.value); }}
                                onFocus={() => { setPasswordRequiredAlarm(false); setPasswordLengthAlarm(false); }}
                                onBlur={handlePasswordAlarm}>
                            </input>
                            {visiblePassword ? <VisibilityOffIcon className='eye' onClick={() => setVisiblePassword(!visiblePassword)} />
                                : <VisibilityIcon className='eye' onClick={() => setVisiblePassword(!visiblePassword)} />}
                        </div>
                        {passwordRequiredAlarm ? <div className='alarm-container'><p className='alarm'>*Enter your password!</p></div> : null}
                        {passwordLengthAlarm ? <div className='alarm-container'><p className='alarm'>*Minimum 8 characters!</p></div> : null}

                        <div className='password-container'>
                            <input className={repasswordAlarm ? "in pass invalid" : "in pass"}
                                value={repassword} type={visibleRepassword ? "text" : "password"} placeholder='Re-Password'
                                onChange={(e) => setRepassword(e.target.value)}
                                onFocus={() => setRepasswordAlarm(false)}
                                onBlur={handleRepasswordAlarm}>
                            </input>
                            {visibleRepassword ? <VisibilityOffIcon className='eye' onClick={() => setVisibleRepassword(!visibleRepassword)} />
                                : <VisibilityIcon className='eye' onClick={() => setVisibleRepassword(!visibleRepassword)} />}
                        </div>
                        {repasswordAlarm && <div className='alarm-container'><p className='alarm'>*Confirm your password!</p></div>}


                        <select className={level === '' ? (levelRequiredAlarm ? "in invalid holder" : "in holder") :
                            (levelRequiredAlarm ? "in invalid" : "in")}
                            value={level} onChange={(e) => setLevel(e.target.value)} onBlur={handleLevelAlarm}
                            onFocus={() => { setLevelRequiredAlarm(false); }}>
                            <option value="" disabled selected hidden >
                                Select Your Level
                            </option>
                            {levels.map(lev => (<option value={lev}>{lev}</option>))}
                        </select>
                        {levelRequiredAlarm && <div className='alarm-container'><p className='alarm'>*Select your level!</p></div>}


                        {/*  departments (Electrical - Civil - Mechanical) */}
                        {
                            (level === 'Junior' || level === 'Senior1' || level === 'Senior2') &&
                            (
                                <>
                                    <select className={department === '' ? (departmentRequiredAlarm ? "in invalid holder" : "in holder") :
                                        (departmentRequiredAlarm ? "in invalid" : "in")}
                                        value={department} onChange={(e) => { setDepartment(e.target.value); setSubdepartment(''); }}
                                        onBlur={handleDepartmentAlarm}
                                        onFocus={() => { setDepartmentRequiredAlarm(false); }}>
                                        <option value="" disabled selected hidden >
                                            Select Your Department
                                        </option>
                                        {departments.map(dep => (<option value={dep.department}>{dep.department}</option>))}
                                    </select>
                                    {departmentRequiredAlarm && <div className='alarm-container'><p className='alarm'>*Select your department!</p></div>}
                                </>
                            )
                        }

                        {/* Sub departments (Elctronics - Computer - Power) */}
                        {
                            // condition
                            ((level === 'Junior' || level === 'Senior1' || level === 'Senior2') && (department === 'Electrical'
                                || department === 'Mechanical' || department === 'Civil' || department === 'Architectural')) &&

                            (
                                <>
                                    <select className={subdepartment === '' ? (subdepartmentRequiredAlarm ? "in invalid holder" : "in holder") :
                                        (subdepartmentRequiredAlarm ? "in invalid" : "in")}
                                        value={subdepartment} onChange={(e) => setSubdepartment(e.target.value)} onBlur={handleSubdepartmentAlarm}
                                        onFocus={() => { setSubdepartmentRequiredAlarm(false); }}>
                                        <option value="" disabled selected hidden >
                                            Select Your Sub-Department
                                        </option>
                                        {departments.filter((dep) => { return dep.department === department })[0].subDep
                                            .map(sub => (<option value={sub.name}>{sub.name}</option>))}
                                    </select>
                                    {subdepartmentRequiredAlarm && <div className='alarm-container'><p className='alarm'>*Select Your Sub-Department!</p></div>}
                                </>
                            )
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