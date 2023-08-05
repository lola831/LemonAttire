import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useModal } from '../../context/Modal'
import { createStyle } from '../../store/styles';
import "./StylesFormPage.css"

function StylesFormPage({ styleReturned }) {
    console.log("IN STYLES FORM PAGE")
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState({})
    const [title, setTitle] = useState("")
    const [showMessage, setShowMessage] = useState(false)


    if (!user) return <Redirect to="/login" />

    const handleSubmit = async (e) => {
        e.preventDefault();


        console.log("errors: ", errors)
        if (errors.title) errors.title = "";

        const data = await dispatch(createStyle({title}))
        if (data.errors) {
           setErrors(data.errors[0])

        }else {

            if (styleReturned) {
                console.log("child component style returned", data)
                styleReturned(data)
            }

            setShowMessage(true)
            setTimeout(() => {
                closeModal()
            }, 1500);
        }
    }


    return (
        <div className='styles-form-container'>

            <form onSubmit={handleSubmit}>
                <h1>My New Style</h1>
                <label>
                    Title:
                    <input
                        type="text"
                        className="new-style-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                {errors.title && <span className="error">{errors.title}</span>}
                <button type='submit'> Create Your New Style </button>
            </form>
            {showMessage && (
                <div>YOUR STYLE HAS BEEN CREATED</div>
            )}

        </div>
    )
}

export default StylesFormPage
