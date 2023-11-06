import React, { useContext, useState } from "react";
//import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg"; // this how to import an images
import "./login.scss";
import { AppState } from "../../App";

const Login = () => {
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

  const onSubmitForm = (e) => {
    e.preventDefault();
    alert(JSON.stringify(form, null, 2));
  };

  return (
    <div className={`login-container ${dark ? "dark-container" : ""}`}>
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
        <button
          className={`sign-in-btn ${btn ? "disable" : ""}`}
          type="submit"
          disabled={btn}
          onClick={onSubmitForm}
          onMouseEnter={onHover}
          onMouseLeave={() => setBtn(false)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
