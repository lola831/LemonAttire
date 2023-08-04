import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserFavorites, deleteFavorites } from "../../store/favorites";
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

    const deleteFav = (favId) => {
      dispatch(deleteFavorites(favId))
          .catch((error) => console.log("Error deleting favorite: ", error));

  };




  return (
    <div>
      <h1>My Favorites</h1>
      {
        favorites.map(fav => (
          <div>
            <img alt="" className="fav-img" src={`${fav.image}`}></img>
            <i className="fa-solid fa-x" onClick={() => deleteFav(fav.id)}></i>

          </div>
        ))
      }
    </div>
  )
}

export default Favorites
