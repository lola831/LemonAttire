import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "../Button";
// import "./NewArrivals.css"
// import "../../App.css";
import "./Video.css"

function Video({category}) {
  console.log("catttt", category)

let image;
let msg;
if(category === "Homepage") {
  image = "https://media.istockphoto.com/id/855935274/video/woman-in-hat-and-pleated-long-skirt-is-walking-along-southern-shore.mp4?s=mp4-640x640-is&k=20&c=yy5MLZp0KY1YDu4Zywh8KzS1OqV4OMzDPP1wC-7P6hY="
}
if (category === "Dresses") {
  image = "https://media.istockphoto.com/id/1459020357/video/attractive-young-woman-in-white-dress-standing-on-the-shore-looking-out-at-sunset-the-ocean.mp4?s=mp4-640x640-is&k=20&c=WfX9__tjA1MLXSK8WhdtUWrytm4rEn6v_fOY8Y4Cow0="
  msg = "Dresses"
}


  return (
    <div className={msg ? "msg-container" : "new-arrivals-container"}>
      <video src={image} autoPlay loop muted />
      {/* <div className="summer-collection-text">Summer Collection</div> */}
      {
        msg ? (
          <div className="msg">{msg}</div>
        ) : (
          <Link className="link-new-arrivals" to="/new-arrivals">Shop New Arrivals</Link>
        )
      }

    </div>
  )
}

export default Video
