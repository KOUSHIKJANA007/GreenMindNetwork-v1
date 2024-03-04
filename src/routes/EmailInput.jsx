import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom'
import { emailInput, validationAction } from '../store/OtpValidation';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';

const EmailInput = () => {
    const { loading, progress } = useSelector((store) => store.validation)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const handleOnChange = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value });
    }
    const handleSubmit = () => {
        dispatch(validationAction.setProgress(50))
        dispatch(emailInput(email))
            .then(unwrapResult)
            .then((data) => {
                if (data.success == true) {
                    dispatch(validationAction.setEmail(email.email));
                    toast.success(data.message);
                    navigate("/otp-input")
                }
                if (data.success == false) {
                    toast.error("Email is already exist")
                    navigate("/email-input")
                }
                dispatch(validationAction.setProgress(100))
            })
    }
    return (
        <>
            {loading && <LoadingBar color="#78be20" progress={progress} />}
            <Form className="login_container" onSubmit={handleSubmit} >
                <h1 className='email_val_heading'>Enter your valid email</h1>

                <div className="login_input_box">
                    <label htmlFor="email">Email</label>
                    <input className='login_input' onChange={handleOnChange} type="email" name="email" id='email' />
                </div>

                <div className="login_button">
                    <button type='submit'>Login</button>

                </div>


            </Form>
        </>
    )
}

export default EmailInput