import React from 'react'
import OpenModalButton from '../OpenModalButton'
import StylesFormPage from './StylesFormPage'

function Styles() {

    return (
        <div>
            <div>My Styles</div>
            <OpenModalButton
                buttonText="NEW STYLE"
                modalComponent={<StylesFormPage />}
            />
        </div>
    )
}

export default Styles
