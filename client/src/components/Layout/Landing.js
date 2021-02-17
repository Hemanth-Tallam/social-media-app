import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const landing = ({isAuthorized}) =>{
    if(isAuthorized){
        return <Redirect to="/dashboard" />
    }

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                <h1 className="x-large">Friends Connector</h1>
                <p className="lead">
                    Share posts to your friends and have fun
                </p>
                <div className="buttons">
                    <Link to="/register" className="btn btn-primary">Sign Up</Link>
                    <Link to="/login" className="btn btn-light">Login</Link>
                </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = state =>({
    isAuthorized : state.auth.isAuthorized
})

export default connect(mapStateToProps)(landing)