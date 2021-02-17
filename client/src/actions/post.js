import {
        GET_POSTS,
        UPDATE_LIKES,
        DELETE_POST,
        POST_ERROR,
        GET_POST,
        ADD_POST,
        ADD_COMMENT,
        DELETE_COMMENT} from './types'
import axios from 'axios'
import {setAlert} from './alert'

//get all posts
export const getPosts = () => async dispatch =>{
    axios.get('/api/posts')
            .then(res=>{
                dispatch({
                    type:GET_POSTS,
                    payload:res.data
                })
            })
            .catch(err=>{
                dispatch({
                    type:POST_ERROR,
                    payload:{msg : "Server Error",status : "401"}
                })
            })
}

//get a single post
export const getPost = id => async dispatch =>{
    axios.get('/api/posts/'+id)
            .then(res=>{
                dispatch({
                    type:GET_POST,
                    payload:res.data
                })
            })
            .catch(err=>{
                dispatch({
                    type:POST_ERROR,
                    payload:{msg : "Server Error",status : "401"}
                })
            })
}

//like a particular post
export const addLike = id => async dispatch =>{
    axios.put(`/api/posts/like/${id}`)
            .then(res=>{
                dispatch({
                    type:UPDATE_LIKES,
                    payload:{id,likes:res.data}
                })
            })
            .catch(err=>{
                if(err.response){
                    if(err.response.msg){
                        dispatch(setAlert(err.response.msg,"danger"))
                    }
                }
                dispatch({
                    type:POST_ERROR,
                    payload:{msg : "Server Error",status : "401"}
                })
            })
}

//remove like
export const removeLike = id => async dispatch =>{
    axios.put(`/api/posts/unlike/${id}`)
            .then(res=>{
                dispatch({
                    type:UPDATE_LIKES,
                    payload:{id,likes:res.data}
                })
            })
            .catch(err=>{
                if(err.response){
                    if(err.response.msg){
                        dispatch(setAlert(err.response.msg,"danger"))
                    }
                }
                dispatch({
                    type:POST_ERROR,
                    payload:{msg : "Server Error",status : "401"}
                })
            })
}

//delete post
export const deletePost = id => async dispatch =>{
    if(window.confirm("wanted to delete post")){
        axios.delete(`/api/posts/${id}`)
                .then(res=>{
                    dispatch({
                        type:DELETE_POST,
                        payload:id
                    })
                    dispatch(setAlert("Post deleted sucessfully","sucess"))
                })
                .catch(err=>{
                    if(err.response){
                        if(err.response.msg){
                            dispatch(setAlert(err.response.msg,"danger"))
                        }
                        else{
                            dispatch(setAlert("Unable to delete post","danger"))
                        }
                    }
                    dispatch({
                        type:POST_ERROR,
                        payload:{msg : "Server Error",status : "401"}
                    })
                })
    }
}

//add post
export const addPost = (formData,history) => async dispatch =>{
    axios.post('/api/posts',formData)
            .then(res=>{
                console.log(res.data)
                dispatch({
                    type : ADD_POST,
                    payload : res.data
                })
                history.push('/posts')
            })
            .catch(err=>{
                dispatch({
                    type : POST_ERROR,
                    payload : {msg:"server error"}
                })
            })
}

//add comment
export const addComment = (postId,comment) => async dispatch =>{
    axios.post(`/api/posts/comment/${postId}`,comment)
            .then(res=>{
                dispatch({
                    type:ADD_COMMENT,
                    payload:res.data
                })
                dispatch(setAlert("comment added sucessfully","success"))
            })
            .catch(err=>{
                if(err.response){
                    if(err.response.msg){
                        dispatch(setAlert(err.response.msg,"danger"))
                    }
                    else{
                        dispatch(setAlert("Unable to delete post","danger"))
                    }
                }
                console.log("reason for error ",err)
                dispatch({
                    type:POST_ERROR,
                    payload:{msg : "Server Error",status : "401"}
                })
            })
}

//delete comment
export const deleteComment = (postId,commentId) => async dispatch =>{
    axios.delete(`/api/posts/comment/${postId}/${commentId}`)
            .then(res=>{
                dispatch({
                    type:DELETE_COMMENT,
                    payload:commentId
                })
                dispatch(setAlert("comment deleted sucessfully","sucess"))
            })
            .catch(err=>{
                if(err.response){
                    if(err.response.msg){
                        dispatch(setAlert(err.response.msg,"danger"))
                    }
                    else{
                        dispatch(setAlert("Unable to delete post","danger"))
                    }
                }
                dispatch({
                    type:POST_ERROR,
                    payload:{msg : "Server Error",status : "401"}
                })
            })
}