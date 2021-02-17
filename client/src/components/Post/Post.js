import React,{Fragment,useEffect} from 'react'
import {connect} from 'react-redux'
import Spinner from '../Layout/Spinner'
import {Link} from 'react-router-dom'
import {addLike,removeLike,deletePost,getPost} from '../../actions/post'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post= ({match,getPost,post:{post,loading}}) =>{

    useEffect(()=>{
        getPost(match.params.id)
    },[getPost,match.params.id])

    return loading || post===null ? <Spinner /> :( 
    <Fragment>
        <Link to="/posts" className="btn">back to posts</Link>
        <PostItem post={post} />
        <CommentForm postId={post._id} />
        <div className="post bg-white p-1 my-1">
            {post.comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
        </div>
    </Fragment> )
}

const mapStateToProps = state =>({
    auth : state.auth,
    post : state.post
})

export default connect(mapStateToProps,{addLike,removeLike,deletePost,getPost})(Post)

//{_id,name,img,date,text,user,likes,comments,avatar}