import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "../Button";
// import "./NewArrivals.css"
// import "../../App.css";
import "./Video.css"

function Video() {




  return (
    <div className="new-arrivals-container">
      {/* <video className="vid" src={vid} autoPlay loop muted /> */}

    <video loading="lazy" className="video-homepage" src="https://lemonattire.s3.us-west-1.amazonaws.com/AdobeStock_174736847.mov" autoPlay loop muted />

      {/* <video src="https://media.istockphoto.com/id/855935274/video/woman-in-hat-and-pleated-long-skirt-is-walking-along-southern-shore.mp4?s=mp4-640x640-is&k=20&c=yy5MLZp0KY1YDu4Zywh8KzS1OqV4OMzDPP1wC-7P6hY=" autoPlay loop muted /> */}
      {/* <div className="summer-collection-text">Summer Collection</div> */}
        <Link className="link-new-arrivals" to="/new-arrivals">Shop New Arrivals</Link>
    </div>
  )
}

export default Video
