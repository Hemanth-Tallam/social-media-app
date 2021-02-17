import {PROFILE_ERROR,GET_PROFILE, CLEAR_PROFILE,UPDATE_PROFILE,
    GET_PROFILES, GET_USER_PROFILE,CLEAR_USER_PROFILE } from '../actions/types'

const initialState ={
    profile: null,
    profiles: [],
    loading :true,
    error : {},
    user_profile:null
}

export default function(state=initialState,action){
    const {type,payload} = action
    switch(type){
        case GET_USER_PROFILE:
            return{
                ...state,
                user_profile:payload,
                loading:false
            }
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile : payload,
                loading : false,
            }
        case GET_PROFILES:
            return{
                ...state,
                profiles:payload,
                loading:false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                profile:null, 
                loading:false,
                error:payload
            }
        case CLEAR_USER_PROFILE:
            return{
                ...state,
                loading:false,
                user_profile:null
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                profile:null,
                loading :false
            }
        default:
            return state
    }
}