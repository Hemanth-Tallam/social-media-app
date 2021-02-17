import React from 'react'
import {connect} from 'react-redux'

const Alert = ({alerts}) =>{
    if (alerts){
        return alerts.map(alert => (
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    {alert.msg}
                </div>))
    }
    else{
        return <javascript></javascript>
    }
}

const mapStateToProps = state =>({
    alerts : state.alert
})

export default connect(mapStateToProps)(Alert)
