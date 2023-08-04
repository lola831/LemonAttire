import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import OpenModalButton from '../OpenModalButton'
import StylesFormPage from './StylesFormPage'

function Styles() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    useEffect( () => {

    }, [ ] );

    if (!user) return (
        <Redirect to='/login'></Redirect>
    )

    return (
        <div>
            <div>My Styles</div>
            <OpenModalButton
                buttonText="NEW STYLE"
                modalComponent={<StylesFormPage />}
            />
            <div>

            </div>
        </div>
    )
}

export default Styles
