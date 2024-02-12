import React from 'react'

const SignIn = () => {
  return (
    <>
      <div className="login_container">
          <h1>Sign In To Access This Page</h1>
          <div className="login_input_box">
            <label htmlFor="password">Username</label>
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
        </div>
    </>
  )
}

export default SignIn