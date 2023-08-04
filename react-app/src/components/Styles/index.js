import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getUserStyles } from "../../store/styles";
import OpenModalButton from '../OpenModalButton'
import StylesFormPage from './StylesFormPage'

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

    if (user && styles.length) {
        return (
            <div>
                <div>My Styles</div>
                <OpenModalButton
                    buttonText="NEW STYLE"
                    modalComponent={<StylesFormPage styles={styles} />}
                />
                <div className="styles-cards-container">
                    {
                        styles.map(style => (
                            <div key={style.id} className="style-card">
                                <Link to={`/styles/${style.id}`}>
                                    <div>{style.title}</div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default Styles
