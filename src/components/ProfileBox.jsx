import React from 'react'
import { Link } from 'react-router-dom'

const ProfileBox = () => {
    return (
        <>
            <div className="person_box">
                <Link to="#"><img className="dp_image" src="image/college.jpg" alt="" /></Link>
                <Link className='dp_name' to="#">Koushik Jana</Link>
            </div>
        </>
    )
}

export default ProfileBox