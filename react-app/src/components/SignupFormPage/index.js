import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import "../../App.css"

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {

        setErrors(data)

      }
    } else {
      setErrors({ password: "Confirm Password field must be the same as the Password field." })
    }
  };

  return (
    <div className="sign-up-container">

      <h1 className="create-account">Sign up</h1>

      <form className="sign-up-form" onSubmit={handleSubmit}>

        <label className="sign-up-label">
          First Name
        </label>
        <input
          className="sign-up-input"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {errors.firstName && (<p className="sign-up-errors">*{errors.firstName}</p>)}
        <label className="sign-up-label">
          Last Name
        </label>
        <input
          className="sign-up-input"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {errors.lastName && (<p className="sign-up-errors">*{errors.lastName}</p>)}
        <label className="sign-up-label">
          Email
        </label>
        <input
          className="sign-up-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && (<p className="sign-up-errors">*{errors.email}</p>)}
        <label className="sign-up-label">
          Password
        </label>
        <input
          className="sign-up-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="sign-up-label">
          Confirm Password
        </label>
        <input
          className="sign-up-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errors.password && (<p className="sign-up-errors">*{errors.password}</p>)}
        <div className="sign-up-button">
          <button className="store-button-white sign-up-b" type="submit">Sign up</button>
        </div>
      </form>


    </div>
  );
}

export default SignupFormPage;
