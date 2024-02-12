import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <>
      <div className="login_container">
        <h1>Sign In To Access This Page</h1>
        <div className="login_input_box">
          <label htmlFor="username">Username</label>
          <input className='login_input' type="text" name='username' id='username' />
        </div>
        <div className="login_input_box">
          <label htmlFor="password">Password</label>
          <input className='login_input' type="password" name='password' id='password' />
        </div>
        <div className="login_input_box_check">

          <input className='login_input_check' type="checkbox" name="check" id="check" />
          <label htmlFor="check">Remember me</label>
        </div>
        <div className="login_button">
          <button type='submit'>Login</button>
        </div>
        <div className="forgot_link">
          <Link to="#">forgot password?</Link>
        </div>
        <div className="register_link">
          <p>Not a member? <Link to="/signup">Register here</Link></p>
        </div>
      </div>
    </>
  )
}

export default SignIn