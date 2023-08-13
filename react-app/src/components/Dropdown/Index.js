import React, { useState } from 'react'
// import { useDispatch } from "react-redux";
// import { useSelector } from 'react-redux';
import "./Dropdown.css"
import AllProducts from '../AllProducts'
// import { getCategoriesThunk } from '../../store/categories';

function Dropdown({ items }) {
    // const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(false)
    // const categories = useSelector(state => state.categories)

    // useEffect(() => {
	// 	dispatch(getCategoriesThunk())
	// }, [dispatch])

    const categories = [
        "Tops",
        "Activewear",
        "Bags",
        "Pants",
        "Dresses",
        "Hats",
        "Jackets",
        "Shorts",
        "Skirts",
        "Sweaters",
        "Shoes",
        "View All"
    ]

  return (
    <ul className={'nav-submenu'} onClick={() => setDropdown(!dropdown)}>
        {categories.map((category, i) => {
            return (
                <li key={i}>
                    <link
                    to={AllProducts}
                    className='nav-submenu-item'
                    onClick={() => setDropdown(false)}>
                      {/* category */}
                    </link>
                </li>
            )
        })}
    </ul>
  )
}

export default Dropdown
