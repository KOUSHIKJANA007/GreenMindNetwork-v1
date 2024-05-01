import React, { useEffect, useState } from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { PiChatsLight } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { FiSend } from "react-icons/fi";

import { over } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllMessage, messageAction } from '../store/messageSlice';
import { unwrapResult } from '@reduxjs/toolkit';

var stompClient=null;
const ContactUs = () => {
  document.title = "Contact Us";
  const dispatch=useDispatch();
  const [content, setContent] = useState('');
  const navigate=useNavigate();
  const [toggleHelp, setToggleHelp] = useState(true);
  const { users, admin_user } = useSelector((store) => store.user);
  const { user_chat_message } = useSelector((store) => store.message);
  const handleToggleHelp = () => {
    setToggleHelp(!toggleHelp)
  }
  const handleContent=(e)=>{
    setContent(e.target.value);
  }
  const connect=()=>{
    let socket = new SockJS("http://localhost:8080/greenmindnetwork")
    stompClient=over(socket);
    stompClient.connect({},onConnected,onError);
  }
  const onConnected = () => {
    stompClient.subscribe("/user/admin/private", onMessage);
    stompClient.subscribe(`/user/${users?.id}/private`, onUserMessage);
  }
  const onError = (err) => {
    console.log(err);
  }
  const onMessage = (payload) => {
   let data=JSON.parse(payload?.body)
   if(data != null && data?.userId==users?.id){
    dispatch(messageAction.setUserChatMessage(data));
   }
   
  }
  const onUserMessage = (payload) => {
   let data=JSON.parse(payload?.body)
   if(data != null){
    dispatch(messageAction.setUserChatMessage(data));
   }
  }
  useEffect(()=>{
    dispatch(getAllMessage())
    .then(unwrapResult)
    .then((data)=>{
      if (data?.id !== null) {
        data?.map((item) => {
          dispatch(messageAction.setUserChatMessage(item));
        })
      }
    })
  },[])
  const sendMessage=()=>{
    stompClient.send(`/app/message`, {}, JSON.stringify({ content: content, receiverName: "admin", userId: users?.id }));
   
  }
  return (
    <>
      <div className='contact_us_conatiner'>
        <h1>get in touch</h1>
        <div className="contact_us_option_conatiner">
          <div className="contact_option">
            <div className="cc_location"><IoLocationOutline className='cc_icons' /></div>
            <h4>visit us</h4>
            <p>you can visit our office in given address</p>
            <h5>Address : Raja Bazar,Paschim Medinipur,721101</h5>
          </div>
          <div className="contact_option">
            <div className="cc_call"><IoCallOutline className='cc_icons' /></div>
            <h4>call us</h4>
            <p>Monday to friday from 8am to 9pm </p>
            <h5>Office Number : 1800 4500 9900</h5>
          </div>
          <div className="contact_option">
            <div className="cc_chat"><IoChatboxEllipsesOutline className='cc_icons' /></div>
            <h4>chat to support</h4>
            <p>Chat with us to any query </p>
            {
              admin_user?.roleName == "ADMIN_USER"
              ?
                <button onClick={() => { navigate("/admin-chat") }}>chat with us</button>
              :
              <button onClick={handleToggleHelp}>chat with us</button>
            }
          </div>
          <div className="contact_option">
            <div className="cc_email"><HiOutlineMail className='cc_icons' /></div>
            <h4>send email</h4>
            <p>Also you can contact by email</p>
            <h5>Email : koushikj4297@gmail.com</h5>
          </div>
        </div>
        <div className="pined_location">
          <h1>our office location</h1>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3688.107760635245!2d87.32683227348468!3d22.424969538368508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d5b3be928a48b%3A0xd243dc802e8c7d!2sN.K.%20Chatterjee%20Memorial%20Maternity%20cum%20Nursing%20Home!5e0!3m2!1sen!2sin!4v1713467401085!5m2!1sen!2sin" width="100%" height="350" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        {
          toggleHelp
            ?
            <div className="help_icon_button" >
              {admin_user?.roleName == "ADMIN_USER"
              ?
               <PiChatsLight className='help_icon' onClick={()=>{navigate("/admin-chat")}} />
               :
              <PiChatsLight className='help_icon' onClick={()=>{handleToggleHelp()
              connect()
              }} />
              }
            </div>
            :
            <div className="popup_help_chat_container">
              <div className="chat_header_part">
                <div className="chat_dp">
                  <img src="/image/college.jpg" alt="" />
                </div>
                <div className="chat_name">
                  <p>Admin</p>
                </div>
                <div className="chat_close">
                  <IoClose onClick={handleToggleHelp} className='chat_close_icon' />
                </div>
              </div>
              <div className="chat_body">
                {user_chat_message?.map((item)=>
              
              <>
                    {((item?.userId !== undefined && item.userId !== users?.id) || (item?.user?.id !== undefined && item?.user?.id !== users?.id)) &&
                      <div className='incomming_message'>
                      <h5>Admin</h5>
                      <p>{item?.content}</p>
                    </div>}
                    {(item.userId === users?.id || item?.user?.id === users?.id) &&
                      <div className='outgoing_message'>
                        <h5>{users?.fname + " " + users?.lname}</h5>
                        <p>{item?.content}</p>
                    </div>}
              </>
              )}
              </div>
              <div className="chat_footer">
                <input type="text" value={content} onChange={handleContent} placeholder='Typing message.....' />
                <button onClick={()=>{
                  sendMessage()
                  setContent("")
                }}><FiSend className='cc_send' /></button>
              </div>
            </div>}
      </div>
    </>
  )
}

export default ContactUs