import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import "./Account.css"

function Account() {

    const dispatch = useDispatch();

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
