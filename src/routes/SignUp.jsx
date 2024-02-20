import React, { useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { signUp } from '../service/user-service';
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState({
        errors: {},
        isError: false
    });
    const [signupData, setSignupData] = useState({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        dob: "",
        password: "",
        check: false
    });
    const handleChange = (event, property) => {
        setSignupData({ ...signupData, [property]: event.target.value })
    }
    const handleSignUpSubmit = (event) => {
        event.preventDefault();
        if (error.errors?.response?.data?.fname != null) {
            toast.error("" + error.errors?.response?.data?.fname)
        }
        if (error.errors?.response?.data?.lname != null) {
            toast.error("" + error.errors?.response?.data?.lname)
        }
        if (error.errors?.response?.data?.email != null) {
            toast.error("" + error.errors?.response?.data?.email)
        }
        if (error.errors?.response?.data?.mobile != null) {
            toast.error("" + error.errors?.response?.data?.mobile)
        }
        if (error.errors?.response?.data?.data != null) {
            toast.error(" " + error.errors?.response?.data?.data)
        }
        if (error.errors?.response?.data?.password != null) {
            toast.error("Enter password " + error.errors?.response?.data?.password)
        }

        signUp(signupData).then((resp) => {
            toast.success("Registation successfully"+ resp.email)
            setSignupData({
                fname: "",
                lname: "",
                email: "",
                mobile: "",
                dob: "",
                password: "",
                check: false
            })
            navigate("/signin")
        })
            .catch((error) => {
                setError({
                    errors: error,
                    isError: true
                })
            })
    }
    return (
        <>
            <Form onSubmit={handleSignUpSubmit} method='POST' className="signup_container">
                <h1>register here</h1>
                <div className="signup_input_box_name">
                    <div className='fname_input'>
                        <label htmlFor="fname">first name</label>
                        <input className='signup_input' type="text" value={signupData.fname} onChange={(e) => handleChange(e, 'fname')} id='fname' />
                    </div>
                    <div className='lname_input'>
                        <label htmlFor="lname">last name</label>
                        <input className='signup_input' type="text" value={signupData.lname} onChange={(e) => handleChange(e, 'lname')} id='lname' />
                    </div>

                </div>
                <div className="signup_input_box">
                    <label htmlFor="email">email</label>
                    <input className='signup_input' type="email" value={signupData.email} onChange={(e) => handleChange(e, 'email')} id='email' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="mobile">mobile</label>
                    <input className='signup_input' type="number" value={signupData.mobile} onChange={(e) => handleChange(e, 'mobile')} id='mobile' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="date">DOB</label>
                    <input className='signup_input' type="date" value={signupData.date} onChange={(e) => handleChange(e, 'dob')} id='date' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="password">Password</label>
                    <input className='signup_input' type="password" value={signupData.password} onChange={(e) => handleChange(e, 'password')} id='password' />
                </div>
                <div className="signup_input_box_check">
                    <input className='login_input_check' type="checkbox" value={signupData.check} onChange={(e) => handleChange(e, 'check')} id="check" />
                    <label htmlFor="check">Agree trems and conditions</label>
                </div>
                <div className="signup_button">
                    <button type='submit'>Sign UP</button>
                </div>
            </Form>
        </>
    )
}
export default SignUp