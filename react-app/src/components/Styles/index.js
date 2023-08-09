import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getUserStyles } from "../../store/styles";
import OpenModalButton from '../OpenModalButton'
import StylesFormPage from './StylesFormPage'
import StylesDetails from "./StylesDetails";

function Styles() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const styles = useSelector(state => state.styles)

    console.log("USER: ", user)
    console.log("STYLES: ", styles)


    useEffect(() => {
        dispatch(getUserStyles())
    }, [dispatch]);

    if (!user) return (
        <Redirect to='/login'></Redirect>
    )



    if (Object.keys(styles).length) {
        let stylesArray = Object.entries(styles).map((style) => ( style[1]))

        return (
            <div>
                <h1>My Styles</h1>
                <OpenModalButton
                    buttonText="new style"
                    modalComponent={<StylesFormPage styles={stylesArray} />}
                />

                <div className="styles-cards-container">
                    {
                        stylesArray.map((style, i) => (
                            <div key={i} className="style-card">
                                <Link  to={`/styles/${style.id}`}>
                                    <div >{style.title}</div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }else {
        return (
            <>
            <div>You have no styles</div>
            <OpenModalButton
                    buttonText="NEW STYLE"
                    modalComponent={<StylesFormPage />}
                />
                </>
        )
    }

}

export default Styles
