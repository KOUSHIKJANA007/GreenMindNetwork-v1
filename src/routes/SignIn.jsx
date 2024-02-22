import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { Form, Link, useNavigate } from "react-router-dom";
import { loginAction, loginUser } from "../store/userDetails";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";


const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState();
  const handleLoginData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }
  const handleLoginFormData = (e) => {
    e.preventDefault();
    if (document.getElementById("username").value.trim() == '' || document.getElementById("password").value.trim() == '') {
      toast.error("username or password is required")
      return;
    }

    dispatch(loginUser(loginData))
      .then(unwrapResult)
      .then((obj) => {
        if (obj.token != null) {
          toast.success("Login successfully done")
          localStorage.setItem("data", JSON.stringify(obj.user));
          localStorage.setItem("token", JSON.stringify(obj.token));
          dispatch(loginAction.setUser(obj.user))
          dispatch(loginAction.doLogin())
          navigate("/userhome")
        } else {
          toast.error(obj.message)
        }
      })

      .catch((obj) => {
        toast.error(obj.message)
      })

  }
  return (
    <>
      <Form className="login_container" onSubmit={handleLoginFormData} >
        <h1>Sign In To Access This Page</h1>
        <div className="login_input_box">
          <label htmlFor="username">Username</label>
          <input className='login_input' type="text" name="username" onChange={handleLoginData} id='username' />
        </div>
        <div className="login_input_box">
          <label htmlFor="password">Password</label>
          <input className='login_input' type="password" name="password" onChange={handleLoginData} id='password' />
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