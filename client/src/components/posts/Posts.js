import React,{Fragment,useEffect} from 'react'
import {connect} from 'react-redux'
import {getPosts} from '../../actions/post'
import Spinner from '../Layout/Spinner' 
import PostItem from './PostItem'

const Posts = ({post:{posts,loading},getPosts})=>{
    useEffect(()=>{
        getPosts()
    },[getPosts])
    return loading || posts===null ? <Spinner /> :(
        <Fragment>
            <h3 className="large text-primary">Posts</h3>
            <p className="lead">
                <i className="fas fa-user" /> Welcome
            </p>
            {/* postform */}
            <div className='posts'>
                {posts.map(post=>(
                    <PostItem key = {post._id} post ={post} />
                ))}
            </div>
        </Fragment>
    )
}

const mapStateToProps = state=>({
    post:state.post, 
})

export default connect(mapStateToProps,{getPosts})(Posts)