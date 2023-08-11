import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getUserStyles, deleteStyle } from "../../store/styles";
import OpenModalButton from '../OpenModalButton'
import StylesFormPage from './StylesFormPage'
import StylesDetails from "./StylesDetails";

import "./Styles.css"

function Styles() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const styles = useSelector(state => state.styles)


    console.log("USER: ", user)
    console.log("STYLES: ", styles)

    let greyImage = "https://garden.spoonflower.com/c/5090068/p/f/m/3yDyWOWB4oECjSmqcc9qmveAYXj9WfizlmWcqq8S3gEqvqlo5DilMA/Light%20Gray%20Solid.jpg"


    useEffect(() => {
        dispatch(getUserStyles())
    }, [dispatch]);

    if (!user) return (
        <Redirect to='/login'></Redirect>
    )

    const removeStyle = (style) => {
        console.log("IN DELETE STYLE FUNCTION IN COMPONENT!!! ", style)
        dispatch(deleteStyle(style.id))
    }


    if (Object.keys(styles).length) {
        let stylesArray = Object.entries(styles).map((style) => (style[1]))
        console.log("STYLES ARRAY: ", stylesArray)

        return (
            <div className="styles-container">
                <div className="page-header">

                    <h1>My Styles</h1>
                </div>
                <div className="styles-cards-container">
                    <div className="style-cards-box">
                        {
                            stylesArray.map((style, i) => (
                                <div key={i} className="style-card">
                                    <Link className="style-link" to={`/styles/${style.id}`}>
                                        <div className="style-card-image-container">
                                            <img className="style-card-image1" src={style.styleItems.length > 0 ? style.styleItems[0].product.products[0].image1 : greyImage}></img>

                                            <div className="style-small-images">
                                                <img className="style-card-image2" src={style.styleItems.length > 1 ? style.styleItems[1].product.products[0].image1 : greyImage}></img>
                                                <img className="style-card-image3" src={style.styleItems.length > 2 ? style.styleItems[2].product.products[0].image1 : greyImage}></img>
                                            </div>
                                        </div>

                                        <div className="style-card-title">{style.title.toLowerCase()}</div>
                                    </Link>
                                    <button className="store-button delete-style2" onClick={() => removeStyle(style)}>delete style</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="new-style-button-container">
                    <OpenModalButton
                        buttonText="add new style"
                        modalComponent={<StylesFormPage styles={stylesArray} />}
                    />
                </div>
            </div>
        )
    } else {
        return (<>
            <div className="page-header">
                    <h1>My Styles</h1>
                </div>
            <div className="styles-container no-styles-container">


                <div className="you-have-no-styles">You have no styles</div>
                <OpenModalButton
                    buttonText="add new style"
                    modalComponent={<StylesFormPage />}
                />
            </div>
            </>
        )
    }

}

export default Styles
