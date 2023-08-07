import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./Footer.css"

function Footer() {
    return (
        <div className='footer-container'>
            <div>
                <h1 className='thanks'>Thanks for stopping by!</h1>
            </div>
            <div className='contact-info'>

                <div className='other-proj'>Feel free to checkout my other projects at:</div>
                <div className='github-stuff'>
                    <Link className='link-github' to="https://github.com/lola831">
                    <i className="fa-brands fa-github"></i>
                    <div className='github-handle'>lola831</div>
                    </Link>
                    <div className='my-name'>Lola Marrero</div>
                </div>


            </div>
        </div>
    )
}

export default Footer
