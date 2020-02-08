import { LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS,
         AUTH_ERROR, USER_LOADING, USER_LOADED, LOGOUT_SUCCESS } from '../actions/types.js'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    userID: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case USER_LOADED: 
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                userID: action.payload.id,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                userID: action.payload.user._id
            }
        case REGISTER_SUCCESS:
            return state
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                userID: null
            }
        default:
            return state
    }
}

export default authReducer