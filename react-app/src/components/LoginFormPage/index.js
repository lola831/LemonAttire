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
        <h1 className="log-in">Login</h1>
      </div>
      <div className="log-in-form-box">
        <form className="log-in-form" onSubmit={handleSubmit}>
          {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
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
          {errors.email && (<p className={errors ? "errors-box" : "no-errors-box"}>{errors.email}</p>)}
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
          <button className="log-in-button" type="submit">Log In</button>
          <button className="log-in-demo-button" onClick={demoUser} type='submit'>Demo User</button>
        </form>
      </div>
      <Link to="/signup" className="link-to-sign-up">Create account</Link>
    </div>
  );
}

export default LoginFormPage;
