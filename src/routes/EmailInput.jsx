import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Outlet, useNavigate } from 'react-router-dom'
import { emailInput, validationAction } from '../store/OtpValidation';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';

const EmailInput = () => {
    window.scroll(0, 0);
    document.title = "Sign Up"
    const { loading, progress } = useSelector((store) => store.validation)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [switchForm, setSwitchForm] = useState(false);
    const handleOnChange = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value });
    }
    const handleSubmit = () => {
       
        dispatch(validationAction.setProgress(50))
        if (document.getElementById("email").value.trim() == '') {
            toast.error("Plaese enter email id");
            return;
        }
        dispatch(emailInput(email))
            .then(unwrapResult)
            .then((data) => {
                if (data.success == true) {
                    dispatch(validationAction.setEmail(email.email));
                    toast.success(data.message);
                    setSwitchForm(true)
                    navigate("/email-input/otp-input")
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
            {
                switchForm ?
                    <Outlet />
                    :
                    <Form className="otp_val_container" onSubmit={handleSubmit} >
                        <h2 >Enter your valid email</h2>

                        <div className="otp_val_input_box">
                            <label htmlFor="email">Email</label>
                            <input className='otp_val_input' onChange={handleOnChange} type="email" name="email" id='email' />
                        </div>

                        <div className="otp_val_button">
                            <button type='submit'>Verify</button>

                        </div>


                    </Form>
            }
        </>
    )
}

export default EmailInput