import React ,{Fragment} from 'react'
import {connect} from  'react-redux'
import { Link } from  'react-router-dom'
import {deleteComment} from '../../actions/post'
import formatDate from '../../utils/formatDate'

const CommentItem = ({auth,deleteComment,postUser,postId,
    comment :{_id,name,avatar,text,date,user}}) =>{
    return (
        <Fragment>
            <div className="imgName">
              <img src={avatar} style={{height:"25px", width:"25px"}} />
              <h4><Link to={"/profile/"+user}>{name}</Link></h4>
              <span className="post-date">
               posted on {formatDate(date)} {' '}
                </span>
            </div>

            <p className="m">
                {text}
                {!auth.loading && (user===auth.user._id || postUser==auth.user._id) &&
                    <span onClick={e=>deleteComment(postId,_id)}
                        type="button"
                        className="btn btn-danger" style={{float:"right"}}>
                            <i className="fas fa-times"></i>
                    </span> 
                }
            </p>

            <div className='line' />

        </Fragment>
    )
}

const mapStateToProps = state =>({
    auth : state.auth
})

export default connect(mapStateToProps,{deleteComment})(CommentItem)