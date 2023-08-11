import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import "./Account.css"

function Account() {

   

    const currentUser = useSelector(state => state.session.user)

    if (!currentUser) return (
        <Redirect to='/login'></Redirect>
    )

  return (
    <>
    <div>My account</div>
    <ul>
      <li><NavLink to='/favorites'>My Favorites</NavLink></li>
      <li><NavLink to='/styles'>My Styles</NavLink></li>
    </ul>
    </>

  )
}

export default Account
