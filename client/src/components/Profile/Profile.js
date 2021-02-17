import React,{Fragment,useEffect} from 'react'
import {connect} from 'react-redux'
import Spinner from '../Layout/Spinner'
import {getProfileById} from '../../actions/profile'
import {Link} from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileEducation from './ProfileEducation'
import PostItem from '../posts/PostItem'

const Profile = ({match,getProfileById,profile:{user_profile,loading},auth}) =>{
    useEffect(()=>{
        getProfileById(match.params.id)
    },[getProfileById,match.params.id])
    return( user_profile===null || loading ? <Spinner /> :
        <Fragment>
            <Link to='/profiles' className='btn btn-light'>
                Back to Profiles
            </Link>
            {auth.isAuthorized && loading===false &&
             (auth.user._id===user_profile[0]._id ?(
                 <Link to='/edit-profile' className="btn btn-dark">
                     Edit Profile
                 </Link> 
                ) : ( 
                <button className="btn btn-dark">
                    Follow
                </button>)
            )}
            {user_profile[0].profile.length>0 ? 
            <div className="profile-grid my-1">
                <ProfileTop profile={user_profile[0]} />
                <ProfileAbout profile={user_profile[0].profile[0]} name={user_profile[0].name} />
                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Education</h2>
                    {user_profile[0].profile[0].education.length > 0 ? (
                        <Fragment>
                        {user_profile[0].profile[0].education.map((education) => (
                            <ProfileEducation
                            key={education._id}
                            education={education}
                            />
                        ))}
                        </Fragment>
                    ) : (
                        <h4>No education credentials</h4>
                    )}
                </div>
            </div> :
            <Fragment>User didnot create his profile yet </Fragment>}
            {auth.isAuthorized && loading===false &&
            <div className='posts'>
            <h4 className="large text-primary">Posts</h4>
                {user_profile[0].posts.length>0 ? user_profile[0].posts.map(post=>(
                    <PostItem key = {post._id} post ={post} />
                )) : <h4>No posts posted yet</h4> }
            </div>}
        </Fragment>
    )
}

const mapStateToProps =state =>({
    profile:state.profile,
    auth : state.auth
})
export default connect(mapStateToProps,{getProfileById})(Profile)