import React, { useEffect, useState } from 'react'
import { LuPhoneCall } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux';
import { bankAction, getBankDetails } from '../store/bankDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { BsBank } from "react-icons/bs";
import EditBankDetails from './EditBankDetails';
import { donationAction, getTotalAmountOfNgo } from '../store/donationDetails';
import {  getTotalSocialPostByNgo, socialPostAction } from '../store/socialImageDetails';
import { eventAction, getTotalEventByNgo } from '../store/eventDetails';

const NgoDetails = ({ ngo }) => {
  const { users, admin_user } = useSelector((store) => store.user);
  const { bankDetails, isUpdate } = useSelector((store) => store.bank);
  const { total_donation_ngo } = useSelector((store) => store.donation);
  const { total_socialPost_of_ngo } = useSelector((store) => store.socialPost);
  const { total_event_by_ngo } = useSelector((store) => store.event);
  const [editOpen, setEditOpen] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBankDetails(ngo?.id))
      .then(unwrapResult)
      .then((data) => {
        dispatch(bankAction.setBankDetails(data))
      })
    dispatch(getTotalAmountOfNgo(ngo?.id))
      .then(unwrapResult)
      .then((data) => {
        dispatch(donationAction.setDonationAmountNgo(data));
      })
    dispatch(getTotalSocialPostByNgo(ngo?.id))
      .then(unwrapResult)
      .then((data) => {
        if (data?.status != '400') { dispatch(socialPostAction.setTotalSocialPostByNgo(data)) }
      })
    dispatch(getTotalEventByNgo(ngo?.id))
      .then(unwrapResult)
      .then((data) => {
        if (data?.status != '400') { dispatch(eventAction.setTotalEventByNgo(data)) }

      })
    dispatch(bankAction.setUpdateEnd())
  }, [isUpdate, total_donation_ngo, total_event_by_ngo])
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(ngo?.description)
  })
  const handleEditForm = () => {
    setEditOpen(!editOpen);
  }
  return (
    <>
      <div className="ngo_about_container">
        <div className="ngo_about_details">
          <h2>contact details</h2>
          <div className="ngo_about_details_data">
            <label htmlFor="email"><MdOutlineMailOutline className='ngo_about_email_icon' /> Email </label>
            <p id='email'>{ngo?.email}</p>
          </div>
          <div className="ngo_about_details_data">
            <label htmlFor="call"><LuPhoneCall className='ngo_about_call_icon' />Call Us</label>
            <p id='call'>{ngo?.mobile}</p>
          </div>
          <div className="ngo_about_details_data">
            <label htmlFor="date"><MdOutlineDateRange className='ngo_about_date_icon' />Foundation Date</label>
            <p id='date'>{ngo?.establishedDate}</p>
          </div>
          <div className="ngo_about_details_data">
            <label htmlFor="address"><SlLocationPin className='ngo_about_add_icon' />Address</label>
            <p id='address'> {ngo?.address}</p>
          </div>
        </div>
        <div className="ngo_about_description">
          <h2>description</h2>
          <p dangerouslySetInnerHTML={sanitizedData()}>
          </p>
          {ngo?.user?.id == users?.id &&
            <div className="ngo_about_edit_button">
              <button><Link to={`/ngo-edit/${ngo?.id}`}>edit ngo details</Link></button>
            </div>}
        </div>
        <div className="ngo_about_count_dash">
          <div className="ngo_about_count">
            <label htmlFor="socialpost">social posts</label>
            <p id='socialpost'>{total_socialPost_of_ngo}</p>
          </div>
          <div className="ngo_about_count">
            <label htmlFor="event">total events</label>
            <p id='event'>{total_event_by_ngo}</p>
          </div>
          <div className="ngo_about_count">
            <label htmlFor="fund">total fund raised</label>
            <p id='fund'>&#8377; {total_donation_ngo}</p>
          </div>
        </div>
        {(ngo?.user?.id == users?.id || admin_user?.roleName == "ADMIN_USER" )&&
          <div className="ngo_bank_details_conatiner">
            <div className="ngo_bank_details">
              <label htmlFor="accHolderName"><BsBank className='bank_icon' />Account Holder name</label>
              <p id='accHolderName'>{bankDetails?.accHolderName}</p>
            </div>
            <div className="ngo_bank_details">
              <label htmlFor="accountNumber"><BsBank className='bank_icon' />Account number</label>
              <p id='accountNumber'>{bankDetails?.accountNumber}</p>
            </div>
            <div className="ngo_bank_details">
              <label htmlFor="ifsc"><BsBank className='bank_icon' />IFSC code</label>
              <p id='ifsc'>{bankDetails?.ifsc}</p>
            </div>

            {ngo?.user?.id == users?.id &&
              <div className='ngo_bank_edit_option'>
                <button onClick={handleEditForm}>edit bank details</button>
              </div>}
          </div>}
        {editOpen && <EditBankDetails handleEditForm={handleEditForm} bankDetails={bankDetails} />}
      </div>
    </>
  )
}

export default NgoDetails