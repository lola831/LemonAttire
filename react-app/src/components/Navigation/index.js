import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const [click, setClick] = useState(false)

	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	return (
		<>
			<nav className='navbar'>
				<div className='navbar-container'>
					<NavLink exact to="/" className="lemon-logo">
						<i class="fa-regular fa-lemon"></i> Lemon
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
							<NavLink to='/' className="nav-links" onClick={closeMobileMenu}>
								Home
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink to='/signup' className="nav-links-mobile" onClick={closeMobileMenu}>
								Sign Up
							</NavLink>
						</li>
					</ul>


						{isLoaded && (
							<ProfileButton user={sessionUser} />
						)}

				</div>
			</nav>
		</>
	);
}

export default Navigation;
