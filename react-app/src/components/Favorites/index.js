import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getUserFavorites, deleteFavorites } from "../../store/favorites";
import "./Favorites.css"


function Favorites() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)
  const favorites = useSelector(state => state.favorites);



  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {

    dispatch(getUserFavorites())
  }, [dispatch, user])

  if (!user) return (
    <Redirect to='/login'></Redirect>
  )

  const deleteFav = (favId) => {
    dispatch(deleteFavorites(favId))
      .catch((error) => console.log("error deleting fav"))
  };




  return (
    <div>
      <div className="fav-header">
        <h1>my favorites</h1>
      </div>
      <div className="fav-main-container">
        {
          favorites.map(fav => (
            <div className="fav-card">
              <Link to={`/shop/${fav.product_type_id}`}>
                <img alt="" className="fav-img" src={`${fav.image}`} loading="lazy"></img>
              </Link>
              {/* <i className="fa-solid fa-x" onClick={() => deleteFav(fav.id)}></i> */}
              <button onClick={() => deleteFav(fav.id)} className="store-button fav-remove-button">remove</button>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Favorites
