import React, { useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { signIn } from '../service/user-service';
import { doLogin } from '../auth';

const SignIn = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })
  const handleChange = (event, property) => {
    setLoginData({ ...loginData, [property]: event.target.value })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (loginData.username.trim() == '' || loginData.password.trim() == '') {
      toast.error("username or password is required")
      return;
    }
    signIn(loginData).then((data) => {

      doLogin(data, () => {
      })

      setLoginData({
        username: '',
        password: ''
      })
      // toast.success("login successfull")
      navigate("/")

      window.location.reload()
    })
      .catch(error => {
        if (error.response.status == 400 || error.response.status == 404) {
          toast.error(error.response.data.message)
        }
        else {
          toast.error("something went wrong...")
        }
      })
  }
  return (
    <>
      <Form onSubmit={handleSubmit} className="login_container">
        <h1>Sign In To Access This Page</h1>
        <div className="login_input_box">
          <label htmlFor="username">Username</label>
          <input className='login_input' type="text" value={loginData.username} onChange={(e) => handleChange(e, 'username')} id='username' />
        </div>
        <div className="login_input_box">
          <label htmlFor="password">Password</label>
          <input className='login_input' type="password" value={loginData.password} onChange={(e) => handleChange(e, 'password')} id='password' />
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

      </Form>
    </>
  )
}



export default SignIn