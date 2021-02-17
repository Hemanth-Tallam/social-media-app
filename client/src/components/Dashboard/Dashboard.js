import React , {useEffect , Fragment, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCurrentProfile , deleteAccount,changePic} from  '../../actions/profile'
import DashboardActions from './DashboardActions'
import Education from './Education'
import Spinner from '../Layout/Spinner'

const Dashboard = ({
    getCurrentProfile,
    auth:{user},
    deleteAccount,
    changePic,
    profile:{profile,loading}})=>{

    useEffect(()=>{
        getCurrentProfile()
    },[getCurrentProfile])

    const picUpdate = image =>{
        set_picloading(true)
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","media-clone")
        data.append("cloud_name","tallam")
        fetch("https://api.cloudinary.com/v1_1/tallam/image/upload",{
            method : 'POST',
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setImg(data.url)
            set_picloading(false)
            changePic(data.url)
        })
        .catch(err=>console.log(err))
    } 

    const [img,setImg] = useState('')
    const [pic_loaing,set_picloading] = useState(false)

    return(
        pic_loaing || (loading && profile===null) ? <Spinner /> :<Fragment>
    {user && user.avatar && (
        <img src={user.avatar} style={{"width":"auto" ,"float" : "right" ,"height" : "200px"}} />
    )}
    <h1 className="large text-primary">
        Dashboard
    </h1>
    <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>
    
    {profile!==null ? 
    (<Fragment>
        <DashboardActions picUpdate={picUpdate} />

        {profile.education.length!==0 ? (<Education education={profile.education} />) : (<Fragment></Fragment>)}

        <div className='my-2'>
            <button className="btn btn-danger" onClick={()=>{deleteAccount()}}>
                <i className="fas fa-user-minus" /> Delete My Account
            </button>
        </div>
    </Fragment>
    ) : (
    <Fragment>
        <p>You Have Not Yet Created Your Profile, Please Add Some Info</p>
        <Link to="/create-profile" className="btn btn-primary my-1" >Create Profile</Link>
    </Fragment>)
    }
    </Fragment>
    )
}

const mapStateToProps =state =>({
    auth :state.auth,
    profile:state.profile
})

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount,changePic})(Dashboard)