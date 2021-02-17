import { REGISTER_SUCCESS ,
     REGISTER_FAILURE , 
     USER_LOADED ,
     AUTH_FAILED ,
     LOGIN_SUCCESS , 
     LOGIN_FAILURE,
     LOGOUT,
     FOLLOW_USER,
     UNFOLLOW_USER,
     FOLLOW_ERROR,
     CLEAR_PROFILE
    } from './types'
import setAuthToken from '../utils/setAuthToken'
import {setAlert} from './alert'
import axios from 'axios'


//loading user
export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    try{
        axios.get('/api/auth')
            .then((response)=>{
                dispatch({
                    type : USER_LOADED,
                    payload : response.data
                })
            })
            .catch(err=>{
                if(err.response){
                    if(err.response.data){    
                        const errors = err.response.data.errors
                        if(errors) errors.map(error => dispatch(setAlert(error.msg,"danger")))
                    }
                }
                dispatch({
                    type : AUTH_FAILED
                })
            })
    }
    catch(err){

    }
} 

//creating new user
export const register = formData => async dispatch =>{
    axios.post('/api/users',formData)
            .then(response=>{
                const payload = response.data
                dispatch({
                    type : REGISTER_SUCCESS,
                    payload :payload
                })
                dispatch(loadUser())
            })
            .catch(err=>{
                if(err.response){
                    if(err.response.data){    
                        const errors = err.response.data.errors
                        if(errors) errors.map(error => dispatch(setAlert(error.msg,"danger")))
                        else{
                            dispatch(setAlert("Server Error" , "danger"))
                        }
                    }
                    else{
                        dispatch(setAlert("Server Error" , "danger"))
                    }
                }
                else{
                    dispatch(setAlert("Server Error" , "danger"))
                }
                dispatch({
                    type : REGISTER_FAILURE
                })
            })
}

//loging in user
export const login = formData => async dispatch =>{
    axios.post('/api/auth',formData)
            .then(response=>{
                const payload = response.data
                dispatch({
                    type : LOGIN_SUCCESS,
                    payload :payload
                })
                dispatch(loadUser())
            })
            .catch(err=>{
                if(err.response){
                    if(err.response.data){    
                        const errors = err.response.data.errors
                        if(errors) errors.map(error => dispatch(setAlert(error.msg,"danger")))
                        else{
                            dispatch(setAlert("Server Error" , "danger"))
                        }
                    }
                    else{
                        dispatch(setAlert("Server Error" , "danger"))
                    }
                }
                else{
                    dispatch(setAlert("Server Error" , "danger"))
                }
                dispatch({
                    type : LOGIN_FAILURE
                })
            })
} 

//logout user
export const logout = () => dispatch =>{
    dispatch({type : LOGOUT})
    dispatch({type : CLEAR_PROFILE })
}

//following user
export const followUser = id =>async dispatch =>{
    axios.post('/api/friends/follow/'+id)
            .then(res=>{
                dispatch({
                    type : FOLLOW_USER,
                    payload : res.data.current_user
                })
            })
            .catch(err=>{
                if(err.response){
                    if(err.response.data){    
                        const errors = err.response.data.errors
                        if(errors) errors.map(error => dispatch(setAlert(error.msg,"danger")))
                        else{
                            dispatch(setAlert("Server Error" , "danger"))
                        }
                    }
                    else{
                        dispatch(setAlert(err.response.msg , "danger"))
                    }
                }
                else{
                    dispatch(setAlert("Server Error" , "danger"))
                }
                dispatch({
                    type : FOLLOW_ERROR,
                    payload: err.response
                })
            })
} 

//Unfollowing user
export const unfollowUser = id =>async dispatch =>{
    axios.post('/api/friends/unfollow/'+id)
            .then(res=>{
                dispatch({
                    type : UNFOLLOW_USER,
                    payload : res.data.current_user
                })
            })
            .catch(err=>{
                if(err.response){
                    if(err.response.data){    
                        const errors = err.response.data.errors
                        if(errors) errors.map(error => dispatch(setAlert(error.msg,"danger")))
                        else{
                            dispatch(setAlert("Server Error" , "danger"))
                        }
                    }
                    else{
                        dispatch(setAlert("Server Error" , "danger"))
                    }
                }
                else{
                    dispatch(setAlert("Server Error" , "danger"))
                }
                dispatch({
                    type : FOLLOW_ERROR,
                    payload: err.response
                })
            })
} 