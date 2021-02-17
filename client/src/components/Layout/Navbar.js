import React ,{Fragment} from 'react'
import {Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'



const Navbar = ({auth:{isAuthorized,loading},logout}) =>{
  const authLinks =(
    <ul>
      <li><Link to="/posts">Posts</Link></li>
      <li><Link to="/newPost">New Post</Link></li>
      <li><Link to="/profiles">Profiles</Link></li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );
  
  const guestLinks =(
    <ul>
      <li><Link to="/profiles">Profiles</Link></li>
      <li><Link to="/register">Signup</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )

  return (
      <nav className="navbar bg-dark">
    <h1>
      <Link to="/">Social Media</Link>
    </h1>
    {!loading && (<Fragment>{isAuthorized ? authLinks :guestLinks}</Fragment>)}
  </nav>
  )
}

const mapStateToProps = state =>({
  auth : state.auth
})

export default connect(mapStateToProps,{logout})(Navbar)