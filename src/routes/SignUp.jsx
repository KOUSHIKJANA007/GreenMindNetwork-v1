import React from 'react'

const SignUp = () => {
  return (
    <>
    <div className="signup_container">
        <h1>register here</h1>
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
            <label htmlFor="password">Password</label>
            <input className='signup_input' type="password" name='password' id='password' />
        </div>
        <div className="signup_input_box_check">
            <input className='login_input_check' type="checkbox" name="check" id="check" />
            <label htmlFor="check">Agree trems and conditions</label>
        </div>
        <div className="signup_button">
            <button type='submit'>Sign UP</button>
        </div>
    </div>
    </>
  )
}

export default SignUp