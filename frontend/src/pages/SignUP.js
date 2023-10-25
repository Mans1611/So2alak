import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom";
import "./SignUp.scss"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import logo from "../../src/Logo (122) 5.png";

const SignUP = () => {
    const levels = ['Freshman', 'Sophomore', 'Junior', 'Senior1', 'Senior2'];
    const departments = ['CSE', 'ECE', 'PHM'];

    const bttnRef = useRef(null);

    const [username, setUsername] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [level, setLevel] = useState('');
    const [department, setDepartment] = useState('');

    const [usernameRequiredAlarm, setUsernameRequiredAlarm] = useState(false);
    const [usernameLengthAlarm, setUsernameLengthAlarm] = useState(false);
    const [usernameInvalidSpaceAlarm, setUsernameInvalidSpaceAlarm] = useState(false);
    const [usernameInvalidSymbolAlarm, setUsernameInvalidSymbolAlarm] = useState(false);
    const [usernameInvalidNumbersAlarm, setUsernameInvalidNumbersAlarm] = useState(false);
    const [usernameFirstLetterAlarm, setUsernameFirstLetterAlarm] = useState(false);

    const [idRequiredAlarm, setIdRequiredAlarm] = useState(false);
    const [idLengthAlarm, setIdLengthAlarm] = useState(false);
    const [idInvalidAlarm, setIdInvalidAlarm] = useState(false);

    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleRepassword, setVisibleRepassword] = useState(false);

    const [passwordRequiredAlarm, setPasswordRequiredAlarm] = useState(false);
    const [passwordLengthAlarm, setPasswordLengthAlarm] = useState(false);
    const [repasswordAlarm, setRepasswordAlarm] = useState(false);

    const [levelRequiredAlarm, setLevelRequiredAlarm] = useState(false);
    const [levelInvalidAlarm, setLevelInvalidAlarm] = useState(false);

    const [departmentRequiredAlarm, setDepartmentRequiredAlarm] = useState(false);
    const [departmentInvalidAlarm, setDepartmentInvalidAlarm] = useState(false);

    const states = [username, id, password, repassword, level, department];

    const alarms = [usernameRequiredAlarm, usernameLengthAlarm, usernameInvalidSpaceAlarm,
        usernameInvalidSymbolAlarm, usernameInvalidNumbersAlarm, usernameFirstLetterAlarm,
        idRequiredAlarm, idLengthAlarm, idInvalidAlarm, passwordRequiredAlarm, passwordLengthAlarm, repasswordAlarm,
        levelRequiredAlarm, levelInvalidAlarm, departmentRequiredAlarm, departmentInvalidAlarm];

    const usernameAlarms = [usernameRequiredAlarm, usernameLengthAlarm, usernameInvalidSpaceAlarm,
        usernameInvalidSymbolAlarm, usernameInvalidNumbersAlarm, usernameFirstLetterAlarm];

    const idAlarms = [idRequiredAlarm, idLengthAlarm, idInvalidAlarm];

    const passwordAlarms = [passwordLengthAlarm, passwordRequiredAlarm];

    const levelAlarms = [levelInvalidAlarm, levelRequiredAlarm];

    const departmentAlarms = [departmentInvalidAlarm, departmentRequiredAlarm];

    const handleUsernameAlarm = () => {
        if (username.length === 0) {
            setUsernameRequiredAlarm(true);
        }
        else if (username.length < 2) {
            setUsernameLengthAlarm(true);
        } else if (username.match(/.* .*/i)) {
            setUsernameInvalidSpaceAlarm(true);
        } else if (username.match(/[^a-z0-9]/i)) {
            setUsernameInvalidSymbolAlarm(true);
        } else if (!isNaN(username)) {
            setUsernameInvalidNumbersAlarm(true);
        } else if (username[0].match(/[^a-z]/i)) {
            setUsernameFirstLetterAlarm(true);
        }
    };

    const handleIdAlarm = () => {
        if (id === '') {
            setIdRequiredAlarm(true);
        } else if (id.length !== 7) {
            setIdLengthAlarm(true);
        } else if (!id.match(/\d\d(\d|p|q|t|w|[0-9])\d\d\d\d/i)) {
            setIdInvalidAlarm(true);
        }
    };

    const handlePasswordAlarm = () => {
        if (password.length === 0) {
            setPasswordRequiredAlarm(true);
        } else if (password.length < 8) {
            setPasswordLengthAlarm(true);
        }
    };

    const handleRepasswordAlarm = () => {
        if (passwordLengthAlarm || passwordRequiredAlarm) {
            return;
        } else if (repassword !== password) {
            setRepasswordAlarm(true);
        }
    };

    const handleLevelAlarm = () => {
        if (level === '') {
            setLevelRequiredAlarm(true);
        } else if (!levels.includes(level)) {
            setLevelInvalidAlarm(true);
        }
    };

    const handleDepartmentAlarm = () => {
        if (department === '') {
            setDepartmentRequiredAlarm(true);
        } else if (!departments.includes(department)) {
            setDepartmentInvalidAlarm(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!alarms.includes(true) && !states.includes("")) {
            alert('أنت رجل محترم');
        }
    };

    return (
        <>
            <div className='signup-container'>
                <div className='signup-left'>
                    <img src={logo} alt='' />
                </div>
                <div className='signup-right'>
                    <form onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <h5>sign up and join our collaborative community!</h5>

                        <input className={usernameAlarms.includes(true) ? "invalid" : "in"}
                            value={username} name='username' type="text" placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                            onFocus={() => {
                                setUsernameLengthAlarm(false); setUsernameRequiredAlarm(false); setUsernameInvalidSpaceAlarm(false);
                                setUsernameInvalidSymbolAlarm(false); setUsernameInvalidNumbersAlarm(false); setUsernameFirstLetterAlarm(false);
                            }}
                            onBlur={handleUsernameAlarm}>
                        </input>
                        {usernameRequiredAlarm && <div className='alarm-container'><p className='alarm'>*Enter your username!</p></div>}
                        {usernameLengthAlarm && <div className='alarm-container'><p className='alarm'>*Minimum 2 characters!</p></div>}
                        {usernameInvalidSpaceAlarm && <div className='alarm-container'><p className='alarm'>*Must have no spaces!</p></div>}
                        {usernameInvalidSymbolAlarm && <div className='alarm-container'><p className='alarm'>*Just letters and numbers!</p></div>}
                        {usernameInvalidNumbersAlarm && <div className='alarm-container'><p className='alarm'>*Must have letters!</p></div>}
                        {usernameFirstLetterAlarm && <div className='alarm-container'><p className='alarm'>*Must begin with a letter!</p></div>}

                        <div className='id-container'>
                            <input className={idAlarms.includes(true) ? "invalid" : "in"}
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
                            <input className={passwordAlarms.includes(true) ? "invalid" : "in"}
                                value={password} name='password' type={visiblePassword ? "text" : "password"} placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => { setPasswordRequiredAlarm(false); setPasswordLengthAlarm(false); }}
                                onBlur={handlePasswordAlarm}>
                            </input>
                            {visiblePassword ? <VisibilityOffIcon className='eye' onClick={() => setVisiblePassword(!visiblePassword)} />
                                : <VisibilityIcon className='eye' onClick={() => setVisiblePassword(!visiblePassword)} />}
                        </div>
                        {passwordRequiredAlarm ? <div className='alarm-container'><p className='alarm'>*Enter your password!</p></div> : null}
                        {passwordLengthAlarm ? <div className='alarm-container'><p className='alarm'>*Minimum 8 characters!</p></div> : null}

                        <div className='password-container'>
                            <input className={repasswordAlarm ? "invalid" : "in"}
                                value={repassword} type={visibleRepassword ? "text" : "password"} placeholder='Re-Password'
                                onChange={(e) => setRepassword(e.target.value)}
                                onFocus={() => setRepasswordAlarm(false)}
                                onBlur={handleRepasswordAlarm}>
                            </input>
                            {visibleRepassword ? <VisibilityOffIcon className='eye' onClick={() => setVisibleRepassword(!visibleRepassword)} />
                                : <VisibilityIcon className='eye' onClick={() => setVisibleRepassword(!visibleRepassword)} />}
                        </div>
                        {repasswordAlarm && <div className='alarm-container'><p className='alarm'>*Confirm your password!</p></div>}

                        <input className={levelAlarms.includes(true) ? "invalid" : "in"}
                            value={level} name='level' list='level' type='text' placeholder='Select Your Level'
                            onChange={(e) => setLevel(e.target.value)} onClick={() => setLevel('')} onBlur={handleLevelAlarm}
                            onFocus={() => { setLevelInvalidAlarm(false); setLevelRequiredAlarm(false); }}>
                        </input>
                        <datalist id='level'>
                            {levels.map(lev => (<option value={lev} />))}
                        </datalist>
                        {levelInvalidAlarm && <div className='alarm-container'><p className='alarm'>*Select a valid level!</p></div>}
                        {levelRequiredAlarm && <div className='alarm-container'><p className='alarm'>*Select a level!</p></div>}

                        <input className={departmentAlarms.includes(true) ? "invalid" : "in"}
                            value={department} name='department' type='text' list='department' placeholder='Select Your Department'
                            onChange={(e) => setDepartment(e.target.value)} onClick={() => setDepartment('')} onBlur={handleDepartmentAlarm}
                            onFocus={() => { setDepartmentInvalidAlarm(false); setDepartmentRequiredAlarm(false); }}>
                        </input>
                        <datalist id='department'>
                            {departments.map(dep => (<option value={dep} />))}
                        </datalist>
                        {departmentInvalidAlarm && <div className='alarm-container'><p className='alarm'>*Select a valid department!</p></div>}
                        {departmentRequiredAlarm && <div className='alarm-container'><p className='alarm'>*Select a department!</p></div>}

                        <button className='signup-button' type='submit' disabled={alarms.includes(true)} ref={bttnRef}
                            onMouseOver={() => { if (states.includes("")) { bttnRef.current.disabled = true; } }}
                            onMouseLeave={() => { if (!alarms.includes(true)) { bttnRef.current.disabled = false; } }}>Sign Up</button>

                        <p className='signin-forward'>Already have an account? <Link to='/signup'>Sign In</Link></p>
                    </form>
                </div >
            </div >
        </>
    )
}

export default SignUP