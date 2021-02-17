import React , {Fragment, useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect } from 'react-redux'
import {setAlert} from '../../actions/alert'
import {register} from '../../actions/auth'
import Spinner from '../Layout/Spinner'

const Register = ({setAlert,register,isAuthorized}) =>{
    const [formData,setFormData] = useState({
        'name':'',
        'email' : '',
        'password' :'',
        'password2' : '',
        'img' : "https://gravatar.com/avatar/2ced5b5ca27371ec67febdb34ed55ff8?d=mm&r=pg&s=200",
        'loading' : false
    })
    const onChange = e =>{
        setFormData({...formData , [e.target.name]:e.target.value})
    } 
    const onImage = (image) =>{
        setFormData({...formData, loading: true})
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","media-clone")
        data.append("cloud_name","tallam")
        fetch("https://api.cloudinary.com/v1_1/tallam/image/upload",{
            method : 'POST',
            body:data
        })
        .then(res=>res.json())
        .then(data=>setFormData({...formData,img:data.url,loading:false}))
        .catch(err=>console.log(err))
    }
    const onSubmit = async(e)=>{
        e.preventDefault()
        if(password!=password2){
            setAlert("passwords didnot match","danger")
        }
        else{
            register(formData)
        }
    }
    const {name , email ,password , password2 , img , loading} = formData

    if(isAuthorized){
        return <Redirect to="/dashboard" />
    }

    return ( 
        loading ? <Spinner /> : 
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" action="create-profile.html" onSubmit = {e => onSubmit(e)}>
                <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Name" 
                    name="name" 
                    value ={name}
                    onChange ={e => onChange(e)}
                    required />
                </div>
                <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email"
                    value = {email}
                    onChange ={e => onChange(e)}
                    required />
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value ={password}
                    onChange ={e => onChange(e)}
                    required
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="6"
                    value ={password2}
                    onChange ={e => onChange(e)}
                    required
                />
                </div>
                <div className="form-group">
                <span style={{"marginRight":"10px" ,fontWeight : "bold"}}>Upload Pic </span>
                <label>
                    <input type="file" style={{display:"none"}} onChange ={(e) => onImage(e.target.files[0])} />
                    <span className="btn btn-image">select Pic</span>
                </label>
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

const mapStateToProps = state =>({
    isAuthorized : state.auth.isAuthorized
})
export default connect(mapStateToProps,{setAlert,register})(Register)