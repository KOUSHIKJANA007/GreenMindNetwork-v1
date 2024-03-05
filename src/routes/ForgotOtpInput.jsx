import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { otpInput, validationAction } from '../store/OtpValidation';
import { Form, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';

const ForgotOtpInput = () => {
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
        if (document.getElementById("otp").value.trim() == '') {
            toast.error("Please enter otp");
            return;
        }
        dispatch(otpInput(otp))
            .then(unwrapResult)
            .then((data) => {
                if (data.success) {
                    toast.success(data.message);
                    navigate("/newpassword");
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
            <Form className="otp_val_container" onSubmit={handleSubmit} >
                <h2>Enter OTP Which send on <span>{useremail}</span></h2>

                <div className="otp_val_input_box">
                    <label htmlFor="otp">Enter OTP Here</label>
                    <input className='otp_val_input' onChange={handleOnChange} type="text" name="otp" id='otp' />
                </div>

                <div className="otp_val_button">
                    <button type='submit'>Verify</button>

                </div>


            </Form>
        </>
    )
}

export default ForgotOtpInput