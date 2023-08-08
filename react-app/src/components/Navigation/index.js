import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import { logout } from "../../store/session";
import { useSelector } from 'react-redux';
import { getCurrentOrder } from '../../store/orders';
// import { getCategoriesThunk } from '../../store/categories';
import './Navigation.css';
// import { Button } from '../Button';
// import Dropdown from '../Dropdown/Index';
// import AllProducts from '../AllProducts';
import "../../App.css"
import HomePage from '../HomePage';

function Navigation({ isLoaded, bag}) {

	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const [click, setClick] = useState(false)
	const [bagItems, setBagItems] = useState(false)
	const order = useSelector(state => state.orders)
	console.log("INNNNNNNNN NAVIGATION COMPONENT!!!!!!!!!!ORDER", order)
	console.log("bagggg ", bag)
	// const [button, setButton] = useState(true)
	// const categories = useSelector(state => state.categories)
	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	useEffect(() => {
		if (sessionUser) {
			dispatch(getCurrentOrder())
		}
	}, [dispatch, sessionUser])

	console.log("CLICK:  ", click)
	console.log("BAG ITEMS ", bagItems)
	// console.log("categories", categories)

	const handleLogout = (e) => {
		e.preventDefault();
		console.log("IN HANDLE LOG OUTTTTTTTT")
		// dispatch(logout());
		dispatch(logout()).then(() => closeMobileMenu()).then(() => {
			return (<Redirect to="/"></Redirect>)
		} )


		// closeMobileMenu()
		// return (
		// 	<Redirect to="/"></Redirect>
		// )
	};

	useEffect(() => {

        if (sessionUser && order && Object.keys(order).length) {
           if (order.orderItems.length) {
			setBagItems(order.orderItems.length)
		   }
        }
    }, [order, sessionUser, bagItems]);






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
							<NavLink to='/shop/' className="nav-links" onClick={closeMobileMenu}>
								Shop
							</NavLink>
						</li>
						{isLoaded && (
							<>
								{sessionUser ? (
									<>
										<li className='nav-item'>
											<NavLink to='/favorites' className="nav-links" onClick={closeMobileMenu}>
												My Favorites
											</NavLink>
										</li>
										<li className='nav-item'>
											<NavLink to='/styles' className="nav-links" onClick={closeMobileMenu}>
												My Styles
											</NavLink>
										</li>
										<li className='nav-item'>
											<NavLink to='/checkout' className="nav-links my-bag" onClick={closeMobileMenu}>
												My Bag

											{bag && <div className='nav-bag-circle'>{bag}</div>}
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
											<NavLink to='/signup' className="nav-links" onClick={closeMobileMenu}>
												Sign Up
											</NavLink>
										</li>
										<li className='nav-item'>
											<NavLink to='/login' className="nav-links" onClick={closeMobileMenu}>
												Log In
											</NavLink>
										</li>
									</>
								)}
							</>
						)}
					</ul>
				</div>
			</nav>
			{/* <Dropdown /> */}
		</>
	);

}

export default Navigation;
