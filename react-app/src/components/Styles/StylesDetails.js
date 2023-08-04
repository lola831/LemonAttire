import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Redirect } from 'react-router-dom';
import { getStyle } from '../../store/styles';

function StylesDetails() {
  const dispatch = useDispatch();
  const { styleId } = useParams();
  const user = useSelector(state => state.session.user)
  const style = useSelector(state => state.styles)

  console.log("STYLE: ", style)

  useEffect(() => {
    dispatch(getStyle(styleId))
}, [dispatch]);

if (!user) return (
    <Redirect to='/login'></Redirect>
)


if (Object.keys(style).length) {
  return (
    <div>
    <h1>{style.title}</h1>
    
    </div>

  )
}else{
  return <div>Loading...</div>
}
}

export default StylesDetails
