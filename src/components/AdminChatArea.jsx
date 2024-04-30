import React, { useEffect, useState } from 'react'
import { IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../store/userDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { getAllMessage, messageAction } from '../store/messageSlice';
import { BASE_URL } from '../store/helper';

const AdminChatArea = ({ toggleTab, handleContent, sendMessage }) => {
    const { admin_message, chat_user_data } = useSelector((store) => store.message);
    const { users } = useSelector((store) => store.user);
    const dispatch=useDispatch();


    useEffect(()=>{
        dispatch(fetchUserById(toggleTab))
        .then(unwrapResult)
        .then((data)=>{
            if(data != null){
                dispatch(messageAction.setChatUserData(data));
            }
        })
    },[toggleTab]);

  return (
    <>
          <div className="help_chat_message_head">
              <div className="help_chat_message_dp">
                  <img src={BASE_URL + `/api/user/image/${chat_user_data?.imageName}`} alt="" />
              </div>
              <div className="help_chat_message_name">
                  <h3>{chat_user_data?.fname+" "+chat_user_data?.lname}</h3>
              </div>
          </div>
          <div className="help_chat_message_head_body">
              {admin_message?.map((item)=>
             <>
                      {(item?.userId !== users?.id || item?.user?.id !== users?.id) && item?.userId===toggleTab &&
                      <div className='admin_incomming_message'>
                          <h5>{chat_user_data?.fname + " " + chat_user_data?.lname}</h5>
                          <p>{item?.content}</p>
                      </div>}
                      {(item?.userId === users?.id || item?.user?.id===users?.id)&& 
                      <div className='admin_outgoing_message'>
                          <h5>{users?.fname + " " + users?.lname}</h5>
                          <p>{item?.content}</p>
                      </div>}
             </>
            )}
          </div>
          <div className="help_chat_message_send">
              <textarea onChange={handleContent} />
              <button onClick={()=>{sendMessage(toggleTab)}}><IoSendSharp className='admin_message_send_icon' /></button>
          </div>
    </>
  )
}

export default AdminChatArea