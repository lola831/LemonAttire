import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Redirect, Link, useHistory } from 'react-router-dom';
import { deleteStyle, getUserStyles, modifyStyle } from '../../store/styles';
import DisplayStyleItems from './DisplayStyleItems';
import "./StyleDetails.css"

function StylesDetails() {
  const dispatch = useDispatch();
  const { styleId } = useParams();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const styles = useSelector(state => state.styles)
  const style = useSelector(state => state.styles[styleId])
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState(style ? style.title : "")
  const [isDeleted, setIsDeleted] = useState(false)
  const [errors, setErrors] = useState("")

  console.log("STYLES ", styles)
  console.log("STYLE: ", style)
  console.log("EDIT: ", edit)
  console.log("EROOR: ", errors)

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

  const backToAll = () => history.push("/styles")

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
                  <i className="fa-solid fa-pen-to-square" title="Edit style title"></i>
                </button>
              </div>
            ) : (
              <form className='edit-style-title-container' onSubmit={handleSubmit}>
                <div className="new-style-title">
                  <label className='new-style-label'>title</label>
                  <input
                    type="text"
                    className="new-style-title-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                {errors.title && (<span className="error">{errors.title}</span>)}
                <i className="fa-solid fa-x cancel-title" onClick={() => setEdit(false)}></i>
                <button className='store-button style-submit-title' type='submit'>save title</button>
                {/* <button className='store-button cancel-title' onClick={() => setEdit(false)}>cancel</button> */}
              </form>
            )
          }
        </div>
        <div className='main-style-details-container'>
          <div className='style-items-display'>
          {
            style.styleItems.length ? (
              <DisplayStyleItems productValues={style.styleItems} />
            ) : (
              <div className='style-is-empty'>Your style is empty,
                <Link className='add-items-link' to="/"> shop and add some items!</Link>
              </div>
            )
          }
          </div>

          <div>
            <button className="delete-style-button store-button" onClick={removeStyle}>Delete style</button>

          </div>


          <button className='store-button link-back-styles' onClick={backToAll}>Go back to all styles</button>


        </div>
      </div>

    )
  } else {
    return <div>Loading...</div>
  }
}

export default StylesDetails
