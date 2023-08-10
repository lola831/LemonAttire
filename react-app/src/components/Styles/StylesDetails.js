import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Redirect, Link } from 'react-router-dom';
import { deleteStyle, getUserStyles, modifyStyle } from '../../store/styles';
import DisplayStyleItems from './DisplayStyleItems';
import "./StyleDetails.css"

function StylesDetails() {
  const dispatch = useDispatch();
  const { styleId } = useParams();
  const user = useSelector(state => state.session.user)
  const styles = useSelector(state => state.styles)
  const style = useSelector(state => state.styles[styleId])
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState(style ? style.title : "")
  const [isDeleted, setIsDeleted] = useState(false)
  const [errors, setErrors] = useState("")

  console.log("STYLE: ", style)
  console.log("EDIT: ", edit)
  console.log("EROOR: ", errors)
  console.log("STYLES ", styles)

  useEffect(() => {
    dispatch(getUserStyles())
  }, [dispatch]);

  if (!user) return (
    <Redirect to='/login'></Redirect>
  )
  if (isDeleted) {
    console.log("NO STYLE ON DETAILS PAGE REDIRECT TO STYLE PAGE")
    return <Redirect to="/styles"></Redirect>
  }

  const removeStyle = async () => {
    dispatch(deleteStyle(style.id))
    setIsDeleted(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === style.title) setEdit(false)

    console.log("errors: ", errors)
    if (errors.title) errors.title = "";

    const data = await dispatch(modifyStyle(style.id, { title }))
    if (data.errors) {
      setErrors(data.errors[0])

    } else {
      setEdit(false)
    }
  }

  console.log("ERROR OUTSIDE OF CHNAGT TTITLE", errors)

  if (Object.keys(styles).length) {

    return (
      <div className='style-details-container'>
        <div className='style-title-box'>
        {
          !edit ? (
            <div className='style-title-container'>
              <div className='style-details-title'>{style.title}</div>
              <button className='change-title-button' onClick={() => setEdit(true)}>
              <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          ) : (
            <form className='edit-style-title-container' onSubmit={handleSubmit}>
              <div className="new-style-title">
              <input
                type="text"
                className="new-style-title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              </div>
              {errors.title && (<span className="error">{errors.title}</span>)}
              <button className='store-button style-submit-title' type='submit'>save title</button>
              <button className='store-button cancel-title' onClick={()=> setEdit(false)}>cancel</button>
            </form>
          )
        }
        </div>
        <div className='style-items-display'>

          <DisplayStyleItems productValues={style.styleItems} />
        </div>

        <div>
          <button className="delete-style-button store-button" onClick={removeStyle}>Delete style</button>

        </div>

        <Link to="/styles">Go back to all styles</Link>

      </div>

    )
  } else {
    return <div>Loading...</div>
  }
}

export default StylesDetails
