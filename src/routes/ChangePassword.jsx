import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { changePassword, validationAction } from '../store/OtpValidation';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const ChangePassword = () => {
    const { useremail, loading, progress } = useSelector((store) => store.validation);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [newPassword, setNwPassword] = useState('');
    const handleOnChange = (e) => {
        setNwPassword({ ...newPassword, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        dispatch(validationAction.setProgress(50))
        e.preventDefault();
        dispatch(changePassword({ newPassword: newPassword.newPassword, email: useremail }))
            .then(unwrapResult)
            .then((data) => {
                if (data.success){
                    toast.success(data.message);
                    navigate("/signin")
                }
                else if(data.success=='false'){
                    toast.error(data.message)
                }
            })
        dispatch(validationAction.setProgress(100))
    }
    return (
        <>
            {loading && <LoadingBar color="#78be20" progress={progress} />}
            <Form className="otp_val_container" onSubmit={handleSubmit} >
                <h2 >Enter a new  password</h2>

                <div className="otp_val_input_box">
                    <label htmlFor="newPassword">Enter new Password</label>
                    <input className='otp_val_input' onChange={handleOnChange} type="password" name="newPassword" id='newPassword' />
                </div>

                <div className="otp_val_button">
                    <button type='submit'>save</button>

                </div>


            </Form>
        </>
    )
}

export default ChangePassword