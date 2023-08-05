import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Redirect } from 'react-router-dom';
import { getStyle, deleteStyle, getUserStyles } from '../../store/styles';

function StylesDetails() {
  const dispatch = useDispatch();
  const { styleId } = useParams();
  const user = useSelector(state => state.session.user)
  const style = useSelector(state => state.styles[styleId])

  console.log("STYLE: ", style)

  useEffect(() => {
    // dispatch(getStyle(styleId))
    dispatch(getUserStyles())
}, [dispatch]);

if (!user) return (
    <Redirect to='/login'></Redirect>
)

const removeStyle = async () => {
  dispatch(deleteStyle(style.id)).then(() => <Redirect to="/styles"></Redirect>)
}

if (!style) {
  return <Redirect to="/styles"></Redirect>
}


if (Object.keys(style).length) {
  return (
    <div>
    <h1>{style.title}</h1>
    <button onClick={removeStyle}>Delete style</button>

    </div>

  )
}else{
  return <div>Loading...</div>
}
}

export default StylesDetails
