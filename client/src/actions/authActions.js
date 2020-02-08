import axios from 'axios'
import { returnError, clearError } from './errorActions'

import { LOGIN_FAIL, LOGIN_SUCCESS, 
    LOGOUT_SUCCESS, REGISTER_FAIL, 
    REGISTER_SUCCESS, AUTH_ERROR,
    USER_LOADED, USER_LOADING }  
from '../actions/types'

export const loadUser = () => (dispatch, getState) => {
    dispatch(clearError())
    dispatch({type: USER_LOADING})

    axios.get('/api/auth', tokenConfig(getState))
        .then(res => {
            dispatch( {
                type: USER_LOADED,
                payload: {
                    id: res.data._id
                }
            })
           
        })
        .catch(err => {
            dispatch(returnError(err.response.data.msg, err.response.status, AUTH_ERROR))
            dispatch({type: AUTH_ERROR})
        })
}

export const logoutUser = () => dispatch => {
    dispatch({ type: LOGOUT_SUCCESS })
}
export const registerUser = (userInfo) => dispatch => {
    dispatch(clearError())
    // userInfo is an object which contains username, email, and password
    axios.post('/api/auth/register', userInfo)
        .then(res => {
            dispatch({type: REGISTER_SUCCESS})
            dispatch(returnError(null, 201, REGISTER_SUCCESS))
        })
        .catch(err => {
            dispatch(returnError(err.response.data.msg, err.response.status, REGISTER_FAIL))
            dispatch({type: REGISTER_FAIL})           
        })
}

export const loginUser = (userInfo) => dispatch => {
    dispatch(clearError())
    // userInfo is an object which contains email, and password
    axios.post('/api/auth/login', userInfo)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token: res.data.token,
                    user: res.data.user
                }
            })
            dispatch(returnError(null, 200, LOGIN_SUCCESS))
        })
        .catch(err => {
            dispatch(returnError(err.response.data.msg, err.response.status, LOGIN_FAIL))
            dispatch({type: LOGIN_FAIL})
        })
}

const tokenConfig = getState => {
    const token = getState().auth.token

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if(token) {
        config.headers = {
            "Content-type": "application/json",
            "x-auth-token": token
        }
    }

    return config
}