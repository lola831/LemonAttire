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


    if (!user) return <Redirect to="/login" />

    const handleSubmit = async (e) => {
        e.preventDefault();


        console.log("errors: ", errors)
        if (errors.title) errors.title = "";

        const data = await dispatch(createStyle({ title }))
        if (data.errors) {
            setErrors(data.errors[0])

        } else {

            if (styleReturned) {
                console.log("child component style returned", data)
                styleReturned(data)
            }
        }
    }


    return (
        <div className='styles-form-container'>

            <form className='new-style-form' onSubmit={handleSubmit}>
                <div className="new-style-box">
                    <div className='bla'>
                        <div className='title-style-box'>
                            <label className='title-label'>
                                title:
                            </label>
                        </div>
                        <div>
                            <input
                                type="text"
                                className="new-style-title-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        {errors.title && <span className="error">{errors.title}</span>}
                    </div>
                </div>
                <div>
                    <button className='add-style-button' type='submit'> create style </button>
                </div>
            </form>
        </div>
    )
}

export default StylesFormPage
