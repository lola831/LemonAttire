import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { logout } from "../../store/session";
import { useSelector } from 'react-redux';
// import { getCategoriesThunk } from '../../store/categories';
import './Navigation.css';
import { Button } from '../Button';
// import Dropdown from '../Dropdown/Index';
// import AllProducts from '../AllProducts';

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const [click, setClick] = useState(false)
	const [button, setButton] = useState(true)
	// const categories = useSelector(state => state.categories)
	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	// useEffect(() => {
	// 	dispatch(getCategoriesThunk())
	// }, [])


	// console.log("categories", categories)

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		closeMobileMenu()
	};

	// function removes button and displays it depending on screen size
	const showButton = () => {
		if (window.innerWidth <= 960) {
			setButton(false)
		} else {
			setButton(true)
		}
	};

	// renders button only on first render?
	useEffect(() => {
		showButton();
	}, [])

	// whenever i resize the screen it will call showbutton()
	window.addEventListener('resize', showButton)


	return (
		<>
			<nav className='navbar'>
				<div className='navbar-container'>
					<NavLink exact to="/" className="lemon-logo" onClick={closeMobileMenu}>
						<i className="fa-regular fa-lemon"></i> Lemon
					</NavLink>
					<div className='menu-icon' onClick={handleClick}>
						<i className={click ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
					</div>
					<ul className={click ? 'menu active' : 'menu'}>
						<li className='nav-item'>
							<NavLink to='/' className="nav-links" onClick={closeMobileMenu}>
								Home
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink to='/shop/' className="nav-links" onClick={closeMobileMenu}>
								Shop
							</NavLink>
						</li>
						{isLoaded && (
							<>
								{sessionUser ? (
									<>
										<li className='nav-item'>
											<NavLink to='/account' className="nav-links" onClick={closeMobileMenu}>
												My account
											</NavLink>
										</li>
										<li className='nav-item'>
											<NavLink to='/checkout' className="nav-links" onClick={closeMobileMenu}>
												My Bag
											</NavLink>
										</li>
										<li className='nav-item'>
											<NavLink to='/account' className="nav-links" onClick={handleLogout}>
												Log out
											</NavLink>
										</li>
									</>
								) : (
									<>
										<li className='nav-item'>
											<NavLink to='/signup' className="nav-links-mobile" onClick={closeMobileMenu}>
												Sign Up
											</NavLink>
										</li>
										<li className='nav-item'>
											<NavLink to='/login' className="nav-links-mobile" onClick={closeMobileMenu}>
												Log In
											</NavLink>
										</li>
									</>
								)}
							</>
							)}
					</ul>
					{ isLoaded && (
						<> { !sessionUser && (
							<>
								{button && <Button buttonStyle='btn--outline' buttonLink='/signup'>Sign Up</Button>}
					{button && <Button buttonStyle='btn--outline' buttonLink='/login'>Log In</Button>}

							</>
							)}
						</>
					)}
				</div>
			</nav>
			{/* <Dropdown /> */}
		</>
	);
}

export default Navigation;
