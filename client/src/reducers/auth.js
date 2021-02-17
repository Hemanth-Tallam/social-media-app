import {
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    AUTH_FAILED,
    USER_LOADED ,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    DELETE_ACCOUNT,
    LOGOUT, 
    UNFOLLOW_USER,
    FOLLOW_ERROR,
    FOLLOW_USER} from '../actions/types'


const initialState ={
    isAuthorized : false,
    token : localStorage.getItem('token'),
    loading : true,
    user : null
}

function authReducer(state = initialState,action){
    const {type,payload}=action
    switch(type){
        case USER_LOADED:
            return{
                ...state,
                isAuthorized : true,
                loading : false,
                user  : payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token)
            return {
                ...state,
                isAuthorized : true,
                token : payload.token,
                loading : false
            }
        case FOLLOW_USER:
        case UNFOLLOW_USER:
            return{
                ...state,
                user : {...state.user,friends:payload},
                loading:false
            }
        case DELETE_ACCOUNT:
        case AUTH_FAILED:
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case LOGOUT:
            localStorage.removeItem('token')
            return{
                ...state,
                isAuthorized : false,
                token : null,
                loading : false,
                user : null
            }
        default:
            return state
    }
}

export default authReducer