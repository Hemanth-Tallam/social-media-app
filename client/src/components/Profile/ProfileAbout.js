import React,{Fragment} from 'react'
import formatDate from '../../utils/formatDate'

const ProfileAbout = ({
    profile: {
        bio,
        skills,
        Birthdate,
        contactNumber,
        status
    },name
    }) =>{
    return(
        <div className='profile-about bg-light p-2'>
        <h4 className='text-primary'>Basic Info</h4>
        <div>
            <p><span className="makeBold">Date of Birth</span> {formatDate(Birthdate)}</p>
            <p><span className="makeBold">Phone Number</span> {contactNumber}</p>
            <p><span className="makeBold">Relationship Status</span> {status}</p>
        </div>
        <div className='line' />
        {bio && (
        <Fragment>
            <h4 className='text-primary'>{name}s Bio</h4>
            <p>{bio}</p>
            <div className='line' />
        </Fragment>
        )}
        <h4 className='text-primary'>Hobbies</h4>
        <div className='skills'>
        {skills.map((skill, index) => (
            <div key={index} className='p-1'>
            <i className='fas fa-check' /> {skill}
            </div>
        ))}
        </div>
    </div>
    )
}

export default ProfileAbout