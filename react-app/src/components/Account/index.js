import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../../store/session";
import "./Account.css"

function Account() {

    const dispatch = useDispatch();
    const [ showMenu, setShowMenu ] = useState( false );
    const ulRef = useRef()

    const closeMenu = ( e ) => {
        if ( !ulRef.current.contains( e.target ) ) {
            setShowMenu( false );
        }
    };

    useEffect( () => {
        dispatch( authenticate() )
        if ( !showMenu ) return;
        closeMenu()
        document.addEventListener( "click", closeMenu );
        return () => document.removeEventListener( "click", closeMenu );
    }, [ dispatch, showMenu ] );


    const currentUser = useSelector(state => state.session.user)
    if (!currentUser) return (
        <div className='no-user'>
            <h1 className='no-user'>Sorry, you need to log in</h1>
            <Link to="/login" className="page-login-link">
      <button className="login-signup-button" type="submit">Login</button>
      </Link>
        </div>
    )

  return (
    <div>My account</div>
  )
}

export default Account
