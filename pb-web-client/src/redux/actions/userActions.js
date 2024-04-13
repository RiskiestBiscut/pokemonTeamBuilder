import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTEHNTICATED } from "../types";
import axios from "axios";

export const loginUser =  (userData, config, navigate) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    const {data} = await axios.post('http://localhost:5000/pb-maker/us-central1/api/login', userData, config)
    setAuthHeader(data.token)
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS})
    navigate("/")
  } catch (err) {
    console.log(err)
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
    
  }
}

export const signupUser =  (newUserData, config, navigate) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    const {data} = await axios.post('http://localhost:5000/pb-maker/us-central1/api/signup', newUserData, config)
    setAuthHeader(data.token)
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS})
    navigate("/")
  } catch (err) {
    console.log(err)
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
    
  }
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTEHNTICATED})
}

export const getUserData = () => (dispatch) => {
  axios.get('http://localhost:5000/pb-maker/us-central1/api/user')
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
}


const setAuthHeader = (token) => {
  const FBIdToken = `Bearer ${token}`
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
}