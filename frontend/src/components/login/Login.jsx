import React, { useState } from "react";
//import { Link } from "react-router-dom";

import "./login.css";

const Login = (props) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    theme: props.theme,
    showPassword: false,
    remember_me: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleTheme = () => {
    let formData = { ...form };
    if (formData["theme"] === "light") {
      formData["theme"] = "dark";
    } else {
      formData["theme"] = "light";
    }
    setForm(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formData = { ...form };
    formData[name] = value;
    setForm(formData);
  };

  const handleShow = (e) => {
    if (form["showPassword"] === false) {
      form["showPassword"] = true;
      e.target.nextElementSibling.type = "text";
      e.target.className = "eye show";
    } else {
      form["showPassword"] = false;
      e.target.nextElementSibling.type = "password";
      e.target.className = "eye";
    }
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
        errorData["email"] = "ID is required";
      } else if (
        !new RegExp(/^\d\d(\d|p|q|t|w)*\d\d\d\d$/i).test(e.target.value)
      ) {
        errorData["email"] = "Please enter a valid ID";
      } else {
        delete errorData["email"];
      }
      setErrors(errorData);
    } else if (e.target.name === "password") {
      if (!e.target.value) {
        errorData["password"] = "Password is required";
      } else if (e.target.value.length < 8) {
        errorData["password"] = "Password must have at minimum 8 characters";
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
    <div
      className={`login-container ${
        form.theme === "dark" ? "dark-container" : ""
      }`}
    >
      <div
        className={`theme ${form.theme === "dark" ? "dark" : ""}`}
        onClick={handleTheme}
      ></div>
      <div className="logo">
        <img src="./images/logo.svg" alt="" />
      </div>
      <form>
        <h1>Sign in</h1>
        <p>Sign in and start managing your candidates!</p>
        <div className="error identifier">
          <input
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
          {errors.email && <div>{errors.email}</div>}
        </div>
        <div className="error">
          <span
            className="eye" //{`eye ${form.showPassword === true ? "show" : ""}`}
            onClick={handleShow}
          ></span>
          <input
            id="pass"
            minLength="8"
            autoComplete="current-password"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onBlur={handleCheck}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {errors.password && <div>{errors.password}</div>}
        </div>
        {/*
        <div className="options">
          <div>
            <input type="checkbox" name="remember" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <Link className="forgot" to="/">
            Forgot password ?
          </Link>
        </div>
  */}
        <button type="submit" onClick={onSubmitForm}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;