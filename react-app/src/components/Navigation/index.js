import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { logout } from "../../store/session";
import { useSelector } from 'react-redux';
import { getCurrentOrder } from '../../store/orders';
import { editBag } from '../../store/bag';
import './Navigation.css';
import "../../App.css"
import HomePage from '../HomePage';
import AllProducts from '../AllProducts';

function Navigation({ isLoaded}) {
	const history = useHistory();
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const bag = useSelector(state => state.bag)
	const [click, setClick] = useState(false)
	const [isCategory, setIsCategory] = useState(false)
	const order = useSelector(state => state.orders)
	const [open, setOpen] = useState(false);


	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	useEffect(() => {
		if (sessionUser) {
			dispatch(getCurrentOrder())
			// dispatch(getCategoriesThunk())
		}
	}, [dispatch, sessionUser])


	const handleOpen = () => {
        setOpen(true);
    };

	const handleClose = () => {
        setOpen(false);
    };

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(editBag(0))
		dispatch(logout())
		.then(() => closeMobileMenu())
		history.push("/")

	};

	const categoryClick = (category) => {
		// console.log("in cat")
		// setIsCategory(true)
		return (
			<AllProducts category={category} />
		)
	}

	const categories = [
        "Tops",
        "Activewear",
        "Pants",
		"Jeans",
        "Dresses",
        "Jackets",
        "Skirts",
		"Shorts",
        "Sweaters",
		"Hats",
		"Shoes",
		"Jewelry",
		"View All",
    ]


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
						<li className='nav-item shop-item'>
						<div className="dropdown-categories">
                            <button className="nav-links shop-btn" onMouseOver={handleOpen} onMouseLeave={handleClose}>Shop</button>
                            {open ? (
                                <ul onMouseEnter={handleOpen} onMouseLeave={handleClose} className="drop-down-menu-categories" >
                                {
                                    categories.map((category,i) => (
										<div className='category-list-container'>
                                        <li key={category}>
											<NavLink onClick={handleClose} className="category-link"
											  to={{
												pathname: '/shop',
												search: `?category=${category}`,
											  }}>{category}</NavLink>
                                        </li>

										</div>
                                    ))
                                }
                            </ul>
                            ) : null}
                        </div>
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
												My Bag{bag > 0 && (` (${bag})`)}
											</NavLink>
										</li>
										<li className='nav-item'>
											<NavLink to='/account' className="nav-links" onClick={handleLogout}>
												Log Out
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
