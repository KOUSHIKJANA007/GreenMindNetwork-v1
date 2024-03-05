import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Form, Link, useNavigate } from "react-router-dom";
import { loginAction, loginUser } from "../store/userDetails";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import LoadingBar from "react-top-loading-bar";
import { localStorageWithExpiry } from "../store/helper";
import { validationAction } from "../store/OtpValidation";


const SignIn = () => {
  const { loading } = useSelector((store) => store.user);
  const { progress } = useSelector((store) => store.validation);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState();
  const handleLoginData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }
  const handleLoginFormData = (e) => {
    e.preventDefault();
    dispatch(validationAction.setProgress(50))
    if (document.getElementById("username").value.trim() == '' || document.getElementById("password").value.trim() == '') {
      toast.error("username or password is required")
      return;
    }

    dispatch(loginUser(loginData))
      .then(unwrapResult)
      .then((obj) => {
        if (obj.token != null) {
          toast.success("Login successfully done")
          localStorageWithExpiry.setItem("data", JSON.stringify(obj.user), 7200000);
          localStorageWithExpiry.setItem("token", JSON.stringify(obj.token), 7200000);
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
    dispatch(validationAction.setProgress(100))
  }
  return (
    <>
      {loading && <LoadingBar progress={progress} color="#78be20" />}
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
          <Link to="/forgot-email">forgot password?</Link>
        </div>
        <div className="register_link">
          <p>Not a member? <Link to="/email-input">Register here</Link></p>
        </div>

      </Form>
    </>
  )
}



export default SignIn