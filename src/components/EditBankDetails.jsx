import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Link } from 'react-router-dom';
import { bankAction, updateBankDetails } from '../store/bankDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import LoadingBar from 'react-top-loading-bar';
import { validationAction } from '../store/OtpValidation';
import { toast } from 'react-toastify';

const EditBankDetails = ({ bankDetails, handleEditForm }) => {
    const { loading } = useSelector((store) => store.bank);
    const { progress } = useSelector((store) => store.validation);
    const dispatch = useDispatch();
    const [bankData, setBankData] = useState('');
    useEffect(() => {
        setBankData(bankDetails);
    }, [])
    const handleOnChange = (e) => {
        setBankData({ ...bankData, [e.target.name]: e.target.value });
    }
    const handleSubmitData = (e) => {
        e.preventDefault();
        if (bankData.accountNumber != document.getElementById("re-accountNumber").value) {
            toast.error("account number not match");
            return;
        }
        dispatch(validationAction.setProgress(50))
        dispatch(updateBankDetails({ bankData: bankData, bankId: bankDetails?.id }))
            .then(unwrapResult)
            .then((data) => {
                dispatch(bankAction.setUpdatePending());
                dispatch(validationAction.setProgress(100))
                toast.success("Bank details saved")
                handleEditForm();
            })
    }

    return (
        <>
            {loading && <LoadingBar color='#78be20' progress={progress} />}
            <Form onSubmit={handleSubmitData} className="ngo_bank_details_container">
                <h2>enter your ngo bank details</h2>
                <div className="ngo_bank_details_data">
                    <label htmlFor="accountNumber">enter account number</label>
                    <input type="number" id='accountNumber' value={bankData?.accountNumber} className='accountNumber' onChange={handleOnChange} name='accountNumber' />
                </div>
                <div className="ngo_bank_details_data">
                    <label htmlFor="re-accountNumber">re-enter account number</label>
                    <input type="number" id='re-accountNumber' className='re-accountNumber' name='re-accountNumber' />
                </div>
                <div className="ngo_bank_details_data">
                    <label htmlFor="ifsc">enter IFSC Code</label>
                    <input type="text" id='ifsc' className='ifsc' value={bankData?.ifsc} onChange={handleOnChange} name='ifsc' />
                </div>
                <div className="ngo_bank_details_data">
                    <label htmlFor="accHolderName">enter account holder name</label>
                    <input type="text" id='accHolderName' className='accHolderName' value={bankData?.accHolderName} onChange={handleOnChange} name='accHolderName' />
                </div>
                <div className="ngo_bank_edit_button">
                    <button type='submit'>save</button>
                </div>
            </Form>
        </>
    )
}

export default EditBankDetails;
