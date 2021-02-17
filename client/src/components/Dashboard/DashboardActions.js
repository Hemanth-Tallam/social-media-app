import React  from 'react'
import {Link} from 'react-router-dom'


const DashboardActions =({picUpdate})=>{
    return(
        <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
            <i className="fas fa-user-circle text-primary"></i>{' '}
            Edit Profile
        </Link>
        <Link to="/add-education" className="btn btn-light">
            <i className="fas fa-graduation-cap text-primary"></i>{' '}
            Add Education
        </Link>
        <div style={{ "display": "inline-block"}}>
            <label>
                <input type="file" style={{display:"none"}} onChange={e=>picUpdate(e.target.files[0])}/>
                <span className="btn btn-primary">Change Pic</span>
            </label>
        </div>
      </div>
    )
}

export default DashboardActions