import React, { useContext, useState } from "react";
import logo from "../../assets/logo.svg"; // this how to import an images
import "./login.scss";
import { AppState } from "../../App";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";


// No button to nav create account
const Login = () => {
  document.title = 'Sign In'; // Making the title for the page.
  const navigate = useNavigate();
  const { dark, setDark } = useContext(AppState); // this is how to import any state and its handler from app without props drilling
  const [form, setForm] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading,setLoading] = useState(false);
  const [btn, setBtn] = useState(false);

  const onHover = (e) => {
    let formData = { ...form };
    let errorData = { ...errors };
    if (
      formData["email"] === "" ||
      formData["password"] === "" ||
      errorData["email"] ||
      errorData["password"]
    ) {
      setBtn(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formData = { ...form };
    formData[name] = value;
    setForm(formData);
  };

  const handleShow = (e) => {
    let formData = { ...form };
    formData["showPassword"] = !formData["showPassword"];
    setForm(formData);
  };

  const handleFocus = (e) => {
    let errorData = { ...errors };
    delete errorData[e.target.name];
    setErrors(errorData);
  };

  const handleCheck = (e) => {
    let errorData = { ...errors };

    if (e.target.name === "email") {
      if (!e.target.value) {
        errorData["email"] = "* ID is required";
      } else if (
        !new RegExp(/^\d\d(\d|p|q|t|w)\d\d\d\d$/i).test(e.target.value)
      ) {
        errorData["email"] = "* Please enter a valid ID";
      } else {
        delete errorData["email"];
      }
      setErrors(errorData);
    } else if (e.target.name === "password") {
      if (!e.target.value) {
        errorData["password"] = "* Password is required";
      } else if (e.target.value.length < 8) {
        errorData["password"] = "* Password must have at minimum 8 characters";
      } else {
        delete errorData["password"];
      }
      setErrors(errorData);
    }
  };

  const onSubmitForm = async(e) => {
    e.preventDefault();
    
    handleCheck(e);
    
    // sending a request to the backendafter passing the validations
    setLoading(true); // I will set the loading state to be ture
    let res;
    try {
      res = await axios.post(`http://localhost:8000/person/signin`,{
        student_id:form.email,
        password : form.password
      })
      console.log(res.request.status)
      if(res.request.status === 200) // this means that the user is signed in 
        navigate('/feedpage')
      
    } catch (error) {
      if(error.response.status === 400)
        setErrors(e=>{return {...e,password:error.response.data.msg}})
      console.log(error.response.data)
    }
    /* here we will put the error msg coming from the server */
    setLoading(false);


    
  };

  return (
    <div className={`login-container ${dark ? "dark-container" : ""}`}>
      {/* here you can just add dark and then use & in scss file */}
      <div
        className={`theme ${dark ? "dark" : ""}`}
        onClick={() => setDark(!dark)}
      ></div>
      <div className="logo-signin">
        <img src={logo} alt="So?alak" />
      </div>
      <form className="form-signin">
        <h1 className="h1">Sign in</h1>
        <p className="p">Sign in and start managing your candidates!</p>
        <div className="error identifier">
          <input
            className="i-signin"
            id="id"
            maxLength="7"
            autoComplete="current-email"
            type="text"
            name="email"
            placeholder="ID"
            required
            value={form.email}
            onBlur={handleCheck}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {errors.email && <div className="e-msg">{errors.email}</div>}
        </div>
        <div className="error">
          <span
            className={`eye ${form.showPassword ? "show" : ""}`}
            onClick={handleShow}
          ></span>
          <input
            className="i-signin"
            id="pass"
            minLength="8"
            autoComplete="current-password"
            type={form.showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onBlur={handleCheck}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {errors.password && <div className="e-msg">{errors.password}</div>}
        </div>
        <p className="create-account">Don't have an account? <Link to='/signup'>Create Account</Link></p>
        <button
          className={`sign-in-btn ${btn ? "disable" : ""}`}
          type="submit"
          disabled={btn}
          onClick={onSubmitForm}
          onMouseEnter={onHover}
          onMouseLeave={() => setBtn(false)}
        >
          {
            loading? 'Loading...' :"Login"
          }
        </button>

      </form>
    </div>
  );
};

export default Login;
