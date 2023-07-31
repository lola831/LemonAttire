import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import { getUserFavorites } from "../../store/favorites";
import "./Favorites.css"


function Favorites() {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const favorites = useSelector(state => state.favorites);
    console.log("USER: ", user)
    console.log("FAVORITES: ", favorites)


    useEffect(() => {
        console.log("in usefecy")
        dispatch(getUserFavorites())
    }, [dispatch, user])

    if (!user) return (
        <Redirect to='/login'></Redirect>
    )


  return (
    <div>Favorites</div>
  )
}

export default Favorites
