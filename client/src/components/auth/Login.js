import React , {Fragment, useState} from 'react'
import {Link ,Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({login , isAuthorized}) =>{
    const [formData,setFormData] = useState({
        'email' : '',
        'password' :''
    })
    const onChange = e =>{
        setFormData({...formData , [e.target.name]:e.target.value})
    } 
    const onSubmit = async(e)=>{
        e.preventDefault()
        login(formData)
    }
    const { email ,password  } = formData

    if(isAuthorized){
        return <Redirect to="/dashboard" />
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Log in</h1>
            <p className="lead"><i className="fas fa-user"></i> Log in to Your Account</p>
            <form className="form" action="create-profile.html" onSubmit = {e => onSubmit(e)}>
                <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email"
                    value = {email}
                    onChange ={e => onChange(e)}
                    required />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value ={password}
                    onChange ={e => onChange(e)}
                    required
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign up</Link>
            </p>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthorized : PropTypes.bool
};

const mapStateToProps = state =>({
    isAuthorized : state.auth.isAuthorized
})


export default connect(mapStateToProps,{login})(Login)