import {
    GET_PROFILE,
    GET_PROFILES,
    GET_USER_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    DELETE_ACCOUNT,
    CLEAR_PROFILE
    } from './types'
import axios from 'axios'
import {setAlert} from './alert'
import {loadUser} from './auth'

export const getCurrentProfile = () => async dispatch =>{
    axios.get('/api/profile/me')
            .then(response=>{
                if(response.data.length===0){
                    dispatch({
                        type:PROFILE_ERROR,
                        payload : {msg : "No profile created yet"}
                    })
                }
                else{
                    dispatch({
                        type:GET_PROFILE,
                        payload:response.data[0]
                    })
                }
            })
            .catch(err=>{
                dispatch({
                    type:PROFILE_ERROR,
                    payload : {msg : err.response,status: err.response}
                })
            })
}

//get all profiles
export const getProfiles = () =>async dispatch =>{
    //you can add if needed
    // dispatch({type : CLEAR_USER_PROFILE})
    axios.get('/api/profile')
            .then(res=>{
                dispatch({
                    type:GET_PROFILES,
                    payload : res.data
                })
            })
            .catch(err=>{
                dispatch(setAlert("server error","danger"))
            })
}

//get profile by id
export const getProfileById = userId =>async dispatch =>{
    axios.get('/api/profile/user/'+userId)
            .then(res=>{
                dispatch({
                    type:GET_USER_PROFILE,
                    payload : res.data
                })
            })
            .catch(err=>{
                dispatch(setAlert("server error","danger"))
            })
}

//edit or update or insert new profile
export const createProfile = (formData, history , edit=false  ) => async dispatch =>{
    axios.post('/api/profile',formData)
            .then(response=>{
                dispatch({
                    type : GET_PROFILE,
                    payload : response.data
                })
                dispatch(setAlert(edit ? 'Profile has been updated successfully' : 'Profile created',"success"))
                if(!edit){
                    history.push('/dashboard')
                }
            })
            .catch(err=>{
                if(err.response.data.errors){
                    const errors = err.response.data.errors
                    errors.map(error => dispatch(setAlert(error.msg,"danger")))
                }
                else{
                    dispatch(setAlert("Server Error" , "danger"))
                }
                dispatch({
                    type:PROFILE_ERROR,
                    payload : {msg : err.response,status: err.response.status}
                })
            })
} 

//add education to profile
export const addEducation = (formData,history) =>async dispatch=>{
    axios.put('/api/profile/education',formData)
            .then(response=>{
                dispatch({
                    type:UPDATE_PROFILE,
                    payload : response.data
                })
                dispatch(setAlert("Education Added","success"))
                history.push('/dashboard')
            })
            .catch(err=>{
                if(err.response.data.errors){
                    const errors = err.response.data.errors
                    errors.map(error => dispatch(setAlert(error.msg,"danger")))
                }
                else{
                    dispatch(setAlert("Server Error" , "danger"))
                }
                dispatch({
                    type:PROFILE_ERROR,
                    payload : {msg : err.response,status: err.response.status}
                })
            })
}

//delete eductaion
export const deleteEducation = (id) => async dispatch =>{
    axios.delete('/api/profile/education/'+id)
            .then(response=>{
                dispatch({
                    type:UPDATE_PROFILE,
                    payload : response.data
                })
                dispatch(setAlert("Education deleted","danger"))
            })
            .catch(err=>{
                if(err.response.data.errors){
                    const errors = err.response.data.errors
                    errors.map(error => dispatch(setAlert(error.msg,"danger")))
                }
                else{
                    dispatch(setAlert("Server Error" , "danger"))
                }
                dispatch({
                    type:PROFILE_ERROR,
                    payload : {msg : err.response,status: err.response.status}
                })
            })
}

//change pic
export const changePic = img =>async dispatch =>{
    axios.put('/api/profile/pic',{img})
            .then(res=>{
                dispatch(setAlert("update sucessful","sucess"))
                dispatch(loadUser())
            })
            .catch(err=>{
                console.log(err.response)
            })
}

//delete account
export const deleteAccount = () => async dispatch =>{
    if(window.confirm("you sure to delete your account")){
        // console.log("entered")
        axios.delete('/api/profile')
                .then((res)=>{
                    console.log(res.data)
                    dispatch(setAlert(res.data.msg))
                    dispatch({type:DELETE_ACCOUNT})
                    dispatch({type:CLEAR_PROFILE})
                })
                .catch(err=>{
                    dispatch(setAlert("Server Error" , "danger"))
                    dispatch({
                        type : PROFILE_ERROR,
                        payload : {msg : err.response,status: err.response.status}
                    })
                })
    }
}
