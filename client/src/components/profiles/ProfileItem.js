import React , {Fragment} from 'react'
import {Link} from  'react-router-dom'
import formatDate from '../../utils/formatDate'

const ProfileItem = ({profile}) =>{
    return (
        <div className="profile bg-light">
            <img src={profile.avatar} style={{"width": "200px","height":"200px"}}/>
            <div>
                <h2>{profile.name}</h2>
                <p>created account on {formatDate(profile.date)} </p>
                <p>{profile.email}</p>
                {profile.profile.length>0 ? <Fragment>
                    <p>Contact :- {profile.profile[0].contactNumber}</p>
                </Fragment> : <br/>}
                <br />
                <Link to={'/profile/'+profile._id} className="btn btn-primary">
                    View Profile
                </Link>
            </div>
            
        </div>
    )
}

export default ProfileItem