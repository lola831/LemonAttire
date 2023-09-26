import React from 'react'
import { Link } from 'react-router-dom'
import "./Footer.css"

function Footer() {
    return (
        <div className='footer-container'>
            <>
            <div>
                <h1 className='thanks'>Thanks for stopping by!</h1>
            </div>
            <div className='contact-info'>

                <div className='other-proj'>Feel free to checkout my other projects at:</div>
                <div className='github-stuff'>
                    <div className='links-container'>
                    <Link className='link-github' to={{ pathname: "https://github.com/lola831" }} target="_blank">
                    <i className="fa-brands fa-github"></i>
                    </Link>
                    <Link className='link-github' to={{ pathname: "https://www.linkedin.com/in/lola-marrero/" }} target="_blank">
                    <i className="fa-brands fa-linkedin linkdin"></i>
                    </Link>
                    </div>
                </div>
            </div>
            </>
        </div>
    )
}

export default Footer
