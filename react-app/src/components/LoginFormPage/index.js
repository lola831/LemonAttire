import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      console.log("DATTAAAA: ", data)
      setErrors(data);
    }
  };

  const demoUser = e => {
    console.log("IN DEMO USER BUTTON CLICK")
    e.preventDefault();
    dispatch(login('demo@aa.io', 'password'));
  }

  return (
    <div className="log-in-container">
      <div className="log-in-title-box">
        <h1 className="log-in">Log In</h1>
      </div>
      <div className="log-in-form-box">
        <form className="log-in-form" onSubmit={handleSubmit}>
          <label className="log-in-label">
            Email
          </label>
          <input
            className="log-in-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (<p className={errors ? "errors-box" : "no-errors-box"}>*{errors.email}</p>)}
          <label className="log-in-label">
            Password
          </label>
          <input
            className="log-in-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!errors.email && errors.password && (<p className={errors ? "errors-box" : "no-errors-box"}>*{errors.password}</p>)}
          <div className="log-in-buttons-container">
          <button className="store-button-white log-in-buttons" type="submit">Log In</button>
          <button className="store-button-white log-in-buttons" onClick={demoUser} type='submit'>Demo User</button>
          </div>
        </form>
      </div>
      <Link to="/signup" className="link-to-sign-up">Sign up</Link>
    </div>
  );
}

export default LoginFormPage;
