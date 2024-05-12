import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Outlet, useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { forgotEmail, validationAction } from '../store/OtpValidation'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const ForgotEmail = () => {
    const { loading, progress } = useSelector((store) => store.validation)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [switchForm, setSwitchForm] = useState(false);
    const [email, setEmail] = useState('');
    const handleOnChange = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(validationAction.setProgress(50));
        if (document.getElementById("email").value.trim() == '') {
            toast.error("Plaese enter email id");
            return;
        }
        dispatch(forgotEmail(email))
            .then(unwrapResult)
            .then((data) => {
                if (data.success) {
                    dispatch(validationAction.setEmail(email.email));
                    toast.success(data.message);
                    setSwitchForm(true);
                    navigate("/forgot-email/forgot-otp-input");
                }
                else {
                    toast.error(data.message);
                }
                dispatch(validationAction.setProgress(100));
            })
    }
    return (
        <>
            {loading && <LoadingBar color="#78be20" progress={progress} />}
            {
            switchForm
            ?
            <Outlet/>
            :
            <Form className="otp_val_container" onSubmit={handleSubmit} >
                <h2 >Enter your registered email</h2>

                <div className="otp_val_input_box">
                    <label htmlFor="email">Email</label>
                    <input className='otp_val_input' onChange={handleOnChange} type="email" name="email" id='email' />
                </div>

                <div className="otp_val_button">
                    <button type='submit'>Get OTP</button>
                </div>
            </Form>
            }
        </>
    )
}

export default ForgotEmail