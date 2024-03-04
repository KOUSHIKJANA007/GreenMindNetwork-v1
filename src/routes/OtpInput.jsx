import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import { otpInput, validationAction } from '../store/OtpValidation';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';

const OtpInput = () => {
    const { useremail, loading, progress } = useSelector((store) => store.validation);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [otp, setOtp] = useState('');
    const handleOnChange = (e) => {
        setOtp({ ...otp, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        dispatch(validationAction.setProgress(50))
        e.preventDefault();
        dispatch(otpInput(otp))
            .then(unwrapResult)
            .then((data) => {
                if (data.success) {
                    toast.success(data.message);
                    navigate("/signup");
                }
                else {
                    toast.error(data.message);
                }
                dispatch(validationAction.setProgress(100))
            })

    }
    return (
        <>
            {loading && <LoadingBar color="#78be20" progress={progress} />}
            <Form className="login_container" onSubmit={handleSubmit} >
                <h1 className='otp_val_heading'>Enter OTP send Which send on <span>{useremail}</span></h1>

                <div className="login_input_box">
                    <label htmlFor="otp">OTP</label>
                    <input className='login_input' onChange={handleOnChange} type="text" name="otp" id='otp' />
                </div>

                <div className="login_button">
                    <button type='submit'>Login</button>

                </div>


            </Form>
        </>
    )
}

export default OtpInput