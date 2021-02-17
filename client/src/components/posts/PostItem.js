import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import formatDate from '../../utils/formatDate'
import {addLike,removeLike,deletePost} from '../../actions/post'
import {followUser,unfollowUser} from '../../actions/auth'

const PostItem = ({post :{_id,name,img,date,text,user,likes,comments,avatar},
      followUser,unfollowUser,auth,addLike,removeLike,deletePost}) =>{
  
  let following = false
  
  if(!auth.loading && auth.user && auth.user.friends && auth.user.friends.length>0 && auth.user.friends[0].following.length>0){
    if(auth.user.friends[0].following.some((follow) => follow.user.toString()===user)){
      following=true
    }
  }
  
  
  return(
        <div className="post bg-white p-1 my-1">
          <div className="imgName">
              <img src={avatar} style={{height:"30px", width:"30px"}} />
              <h3><Link to={"/profile/"+user}>{name}</Link></h3>
              {!auth.loading && user!==auth.user._id &&
                <button type="button" className="btn btn-light" style={{"width":"100px"}}
                onClick={()=> !following ? followUser(user) : unfollowUser(user) }>
                    {!following ? "Follow" : "Unfollow"}
                </button>
              }
          </div>
          
          <div>

            <p className="my-1">
            {img && img.length>0 ? <img src={img} style={{"width":"100%","maxHeight":"500px"}} /> : <Fragment> </Fragment>}
            {text}
            </p>

            <p className="post-date">
               posted on {formatDate(date)}
            </p>

            <button type="button" className="btn btn-light" onClick={()=>addLike(_id)}>
              <i className="fas fa-thumbs-up"></i>{ ' ' }
              <span>{likes && likes.length ? likes.length : 0}</span>
            </button>

            <button type="button" className="btn btn-light" onClick={()=>removeLike(_id)}>
              <i className="fas fa-thumbs-down"></i>
            </button>

            <Link to={`/post/${_id}`} className="btn btn-primary">
              Comments {' '}
              {comments && comments.length>0 && <span className='comment-count'>{comments.length}</span>}
            </Link>

            {!auth.loading && user===auth.user._id &&
            <button onClick={e=>deletePost(_id)}
                type="button"
                className="btn btn-danger">
                    <i className="fas fa-times"></i>
            </button> }

          </div>
        </div>
    )
}

const mapStateToProps = state =>({
    auth : state.auth
})

export default connect(mapStateToProps,{addLike,removeLike,deletePost,unfollowUser,followUser})(PostItem)