import React, { useEffect } from 'react'
import "./NewArrivals.css"

function NewArrivals() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='fall-container'>
      {/* <img className='fall-photo' src="https://lemonattire.s3.us-west-1.amazonaws.com/fall_bW_58750075.jpeg"></img> */}
      <img className='fall-photo' src="https://lemonattire.s3.us-west-1.amazonaws.com/fall2_286191493.jpeg" loading="lazy"></img>
      <div className='fall-collection'>Fall Collection 2023</div>
      <div className='fall-coming-soon'>Coming Soon</div>
    </div>
  )
}

export default NewArrivals
