
//not req everything now done in edit profile itself

import React , {Fragment, useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {Link , withRouter} from 'react-router-dom'
import {createProfile} from '../../actions/profile'

const initialData={
    location: '' ,
    status: '' ,
    skills: '' ,
    bio: '' ,
    Birthdate: '' ,
    contactNumber: '' ,
    sex: '' ,
    youtube: '' ,
    twitter: '' ,
    instagram: '' ,
    linkedin: '' ,
    facebook: '' ,
}

const CreateProfile = ({createProfile,history}) =>{
    const [formData,setFormData] = useState(initialData)

    const {
        location,
        status,
        skills,
        bio,
        Birthdate,
        contactNumber,
        sex,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
    } = formData

    const [socialMediaInputs,setSocialMediaInputs] = useState(false)

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value})

    const onSubmit = e =>{
        e.preventDefault()
        createProfile(formData,history)
    }
    
    return (
    <Fragment>
       <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      
      
      <form className="form" onSubmit={(e)=>onSubmit(e)}>
        
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" 
                value={location} onChange={(e)=>{onChange(e)}} required/>
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>

        <div className ="form-group">
            <input type="text" placeholder="* phoneNumber" 
                    name="contactNumber" minLength="10" maxLength="10" required
                    value={contactNumber} onChange={(e)=>{onChange(e)}} required/>
        </div>

        <div className="form-group">
            <select name="status" value={status} onChange={(e)=>{onChange(e)}}>
                <option value="0">* Select Maritial Status</option>
                <option value="Married">Married</option>
                <option value="Single">Single</option>
                <option value="Not willing to say">Not willing to say</option>
            </select>
            <small className = "form-text">

            </small>
        </div>

        <div className="form-group">
            <select name="status" value={sex} onChange={(e)=>{onChange(e)}}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Not willing to say">Not willing to say</option>
            </select>
            <small className = "form-text">
                please select your gender
            </small>
        </div>

        <div className="form-group">
          <h4>Birthdate Date</h4>
          <input type="date" name="Birthdate" value={Birthdate} onChange={(e)=>{onChange(e)}} required/>
        </div>

        <div className="form-group">
          <input type="text" placeholder="* Hobbies" name="skills" value={skills} onChange={(e)=>{onChange(e)}} />
          <small className="form-text"
            >Please use comma separated values (eg.
            eating,sleeping,wathing movies)</small
          >
        </div>
        
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" 
                    name="bio" value={bio} onChange={(e)=>{onChange(e)}}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" onClick={()=>setSocialMediaInputs(!socialMediaInputs)} className="btn btn-light">
            {socialMediaInputs && <Fragment>Don't </Fragment>}Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {socialMediaInputs && <Fragment>
                <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" placeholder="Twitter URL" 
                        name="twitter" value={twitter} onChange={(e)=>{onChange(e)}}  />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook URL" 
                        name="facebook" value={facebook} onChange={(e)=>{onChange(e)}} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input type="text" placeholder="YouTube URL" 
                        name="youtube" value={youtube} onChange={(e)=>{onChange(e)}} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input type="text" placeholder="Linkedin URL" 
                        name="linkedin" value={linkedin} onChange={(e)=>{onChange(e)}}/>
                </div>

                <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input type="text" placeholder="Instagram URL" 
                        name="instagram" value={instagram} onChange={(e)=>{onChange(e)}} />
                </div>
            </Fragment>
        }
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
    </Fragment>
    )
}


export default connect(null,{createProfile})(withRouter(CreateProfile))