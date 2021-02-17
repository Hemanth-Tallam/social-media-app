import {
    GET_POSTS,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT,
    DELETE_COMMENT,
    POST_ERROR,
    GET_POST} from '../actions/types'

const initialState = {
    loading:true,
    posts:null,
    post:null,
    error:{}
}

export default function(state=initialState,action){
    const {type,payload} = action
    switch(type){
        case GET_POSTS:
            return{
                ...state,
                loading:false,
                posts:payload
            }
        case GET_POST:
            return{
                ...state,
                post:payload,
                loading:false
            }
        case ADD_POST:
            return{
                ...state,
                posts : [...state.posts,payload],
                loading : false
            }
        case DELETE_POST:
            return{
                ...state,
                posts : state.posts.filter(post=>post._id!==payload),
                loading : false
            }
        case UPDATE_LIKES:
            if(state.post && state.post._id==payload.id){
                return {
                    ...state,
                    posts: state.posts.map((post) =>
                      post._id === payload.id ? { ...post, likes: payload.likes } : post
                    ),
                    post : {...state.post,likes:payload.likes},
                    loading: false,
                }
            }
            else{
                return {
                ...state,
                posts: state.posts.map((post) =>
                  post._id === payload.id ? { ...post, likes: payload.likes } : post
                ),
                loading: false
                }
            }
        case POST_ERROR:
            return{
                ...state,
                loading:false,
                error: payload
            }
        case ADD_COMMENT:
            return{
                ...state,
                post : {...state.post, comments:payload} ,
                loading:false
            }
        case DELETE_COMMENT:
            return{
                ...state,
                post : {...state.post,comments : state.post.comments.filter(comment=>comment._id!==payload)},
                loading : false 
            }
        default:
            return state
    }
}