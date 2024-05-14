import React, { useEffect, useState } from 'react'
import { IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../store/userDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteAllChat, messageAction } from '../store/messageSlice';
import { BASE_URL } from '../store/helper';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';

const AdminChatArea = ({ toggleTab, handleContent, sendMessage, handleRefreshContent, content }) => {
    const { admin_message, chat_user_data, loading, progress, isDeleteChat } = useSelector((store) => store.message);
    const { users } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [userLoading, setUserLoading] = useState(false);

    useEffect(() => { 
        setUserLoading(true);
        dispatch(fetchUserById(toggleTab))
            .then(unwrapResult)
            .then((data) => {
                if (data != null) {
                    dispatch(messageAction.setChatUserData(data));
                    setUserLoading(false);
                }
            })
    }, [toggleTab, isDeleteChat]);
   
    function clearChat() {
        let f = confirm("are you sure to clear chat?")
        if (f) {
            dispatch(messageAction.setProgress(30));
            dispatch(deleteAllChat(toggleTab))
                .then(unwrapResult)
                .then((obj) => {
                    dispatch(messageAction.setProgress(50));
                    if (obj.success == true) {
                        dispatch(deleteAllChat(users?.id))
                            .then(unwrapResult)
                            .then((data) => {
                                dispatch(messageAction.setDeleteStart());
                                toast.success(data.message);
                                dispatch(messageAction.setProgress(80));
                                
                            })
                    }
                })

        }
        dispatch(messageAction.setProgress(100));
        // window.location.reload();
    }
    return (
        <>
        {userLoading && 
            <div class="loader-wrapper">
            <div className="chat-loader">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            </div>}
            {loading && <LoadingBar progress={progress} color="#78be20" />}
            <div className="help_chat_message_head">
                <div className="help_chat_message_dp">
                    <img src={BASE_URL + `/api/user/image/${chat_user_data?.imageName}`} alt="" />
                </div>
                <div className="help_chat_message_name">
                    <h3>{chat_user_data?.fname + " " + chat_user_data?.lname}</h3>
                </div>
                <button onClick={clearChat} className='clear_chat_button'><MdDelete className='clear_chat_icon' /></button>
            </div>
            <div className="help_chat_message_head_body">
                {admin_message?.map((item) =>
                    <>
                        {((item?.userId !== users?.id || item?.user?.id !== users?.id) && (item?.userId === toggleTab)) &&
                            <div className='admin_incomming_message'>
                                <h5>{chat_user_data?.fname + " " + chat_user_data?.lname}</h5>
                                <p>{item?.content}</p>
                            </div>}
                        {(item?.userId === users?.id || item?.user?.id === users?.id) && (Number(item?.receiverName)===toggleTab) &&
                            <div className='admin_outgoing_message'>
                                <h5>{users?.fname + " " + users?.lname}</h5>
                                <p>{item?.content}</p>
                            </div>}
                    </>
                )}
            </div>
            <div className="help_chat_message_send">
                <textarea value={content} onChange={handleContent} />
                <button onClick={() => {
                    sendMessage(toggleTab)
                    handleRefreshContent()
                }}><IoSendSharp className='admin_message_send_icon' /></button>
            </div>
        </>
    )
}

export default AdminChatArea