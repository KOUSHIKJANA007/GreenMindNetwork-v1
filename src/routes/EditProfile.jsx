import React from 'react'

const EditProfile = () => {
    return (
        <>
            <div className="signup_container">
                <h1>Edit Profile Details</h1>
                <div className="profile_image">

                    <label htmlFor='file_upload'>
                        <img src="image/college.jpg" alt="" />
                    </label>
                        <input type="file" id='file_upload' />

                </div>
                <div className="signup_input_box_name">
                    <div className='fname_input'>
                        <label htmlFor="fname">first name</label>
                        <input className='signup_input' type="text" name='fname' id='fname' />
                    </div>
                    <div className='lname_input'>
                        <label htmlFor="lname">last name</label>
                        <input className='signup_input' type="text" name='lname' id='lname' />
                    </div>

                </div>
                <div className="signup_input_box">
                    <label htmlFor="email">email</label>
                    <input className='signup_input' type="email" name='email' id='email' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="mobile">mobile</label>
                    <input className='signup_input' type="number" name='mobile' id='mobile' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="date">DOB</label>
                    <input className='signup_input' type="date" name='date' id='date' />
                </div>
                <div className="signup_button">
                    <button type='submit'>Save</button>
                </div>
            </div>
        </>
    )
}

export default EditProfile