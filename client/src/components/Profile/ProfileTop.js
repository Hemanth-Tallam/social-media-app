import React from 'react'

const ProfileTop = ({
    profile:{
        name,
        email,
        avatar,
        profile
    }
    })=>{
    const p=profile[0]
    let{location,social}=p;

    return(
      <div className="profile-top bg-primary p-2">
      <img  src={avatar} alt=""  style={{"width":"auto", "maxHeight":"250px"}}/>
      <h1 className="large">{name}</h1>
      <p className="lead">
         {email ? <span> {email}</span> : null}
      </p>
      <p>{location ? <span>{location}</span> : null}</p>
      <div className="icons my-1">
        {social
          ? Object.entries(social)
              .filter(([_, value]) => value) //filters and sends only the things which have link
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${key} fa-2x`}></i>
                </a>
              ))
          : null}
      </div>
    </div>
    )
}

export default ProfileTop