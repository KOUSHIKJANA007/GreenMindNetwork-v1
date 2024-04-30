import React, { useEffect, useState } from 'react'
import { FaUsers } from "react-icons/fa";
import AdminChatArea from '../components/AdminChatArea';

import { over } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, loginAction } from '../store/userDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { getAllMessage, getMessageByUser, messageAction } from '../store/messageSlice';
import { BASE_URL } from '../store/helper';


let stompClient;
const AdminChat = () => {
    document.title = "Help Desk"
    const dispatch=useDispatch();
    const { message_user, admin_message } = useSelector((store) => store.message);
    const { users } = useSelector((store) => store.user);
    const [toggleTab, setToggleTab] = useState(0);
    const [content, setContent] = useState('');
    const handleContent = (e) => {
        setContent(e.target.value);
    }
   useEffect(()=>{
        let socket = new SockJS("http://localhost:8080/greenmindnetwork")
        stompClient = over(socket);
        const connectAndSubscribe = () => {
           stompClient.connect({}, onConnected, onError);
       };
       connectAndSubscribe();
       return()=>{
           if (stompClient && stompClient.connected){
            stompClient.disconnect();
        }
       }
    },[toggleTab]);
    const onConnected = () => {
        stompClient.subscribe("/user/admin/private", onMessage);
        stompClient.subscribe(`/user/${toggleTab}/private`, onUserMessage);
    }
    const onError = (err) => {
        console.log(err);
    }
    const onMessage = (payload) => {
        let data = JSON.parse(payload?.body);
        if(data != null){
            dispatch(messageAction.setAdminMessage(data));
        }
        let userId = data?.userId;
        dispatch(fetchUserById(userId))
        .then(unwrapResult)
        .then((data)=>{
            console.log(data);
            if(data?.id != null || data?.id != undefined){
                dispatch(messageAction.setMessageUser(data));
            }
        })
    }
    const onUserMessage = (payload) => {
        let data = JSON.parse(payload?.body);
        console.log(data);
        if (data != null) {
            dispatch(messageAction.setAdminMessage(data));
        }
    }
    const sendMessage = (data) => {
        stompClient.send(`/app/message`, {}, JSON.stringify({ content: content, receiverName: data, userId: users?.id }));
    }
    function removeDuplicateObjects(array) {
        const uniqueObjects = [];
        const ids = {};

        array.forEach(obj => {
            if (!ids[obj.id]) {
                ids[obj.id] = true;
                uniqueObjects.push(obj);
            }
        });

        return uniqueObjects;
    }
    let finalMessageList=removeDuplicateObjects(message_user);
    console.log(finalMessageList);
    console.log(toggleTab);
    useEffect(()=>{
        dispatch(getAllMessage())
        .then(unwrapResult)
        .then((data)=>{
            // console.log(data[0].user);
            if(data?.id !== null){
               data?.map((item)=>{
                   dispatch(messageAction.setMessageUser(item?.user));
                   dispatch(messageAction.setAdminMessage(item));
               })
            }
        })
    },[])
    return (
        <>
            <div className="help_chat_container">
                <div className="help_chat_heading">
                    <h1>live chat support </h1>
                </div>
                <div className="help_chat_box_container">
                    <div className="help_chat_user_area">
                        <div className="help_chat_user_heading">
                            <FaUsers className='chat_user_icon' />
                            <h1>users</h1>
                        </div>
                       
                        {finalMessageList.map((item)=>
                      <>
                                {(item?.roles[0]?.roleName !== "ADMIN_USER" && item?.roles[1]?.roleName !== "ADMIN_USER") &&
                                <div key={item.id} className={item?.id === toggleTab ? "help_chat_user active" : "help_chat_user"} onClick={() => { setToggleTab(item?.id) }}>
                                    <div className={item?.id === toggleTab ? "help_chat_user_dp active" : "help_chat_user_dp"}>
                                        <img src={BASE_URL + `/api/user/image/${item.imageName}`} alt="" />
                                    </div>
                                    <div className="help_chat_user_name">
                                        <p>{item.fname}</p>
                                    </div>
                                </div>}
                            
                      </>
                    )}
                    </div>

                    <div className="help_chat_message_area">
                        {
                            toggleTab==0
                            ?
                            <div className="help_chat_no_message"></div>
                            :
                        <AdminChatArea  handleContent={handleContent} sendMessage={sendMessage} toggleTab={toggleTab}/>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminChat