import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return <div className="spacer"></div>
    } else {
        return (
            <div className="error">
                {message}
            </div>
        )
    }
}

export default Notification