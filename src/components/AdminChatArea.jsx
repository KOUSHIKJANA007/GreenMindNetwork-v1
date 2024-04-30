import React, { useEffect } from 'react'
import { IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../store/userDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteAllChat, messageAction } from '../store/messageSlice';
import { BASE_URL } from '../store/helper';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const AdminChatArea = ({ toggleTab, handleContent, sendMessage, handleRefreshContent, content }) => {
    const { admin_message, chat_user_data } = useSelector((store) => store.message);
    const { users } = useSelector((store) => store.user);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchUserById(toggleTab))
            .then(unwrapResult)
            .then((data) => {
                if (data != null) {
                    dispatch(messageAction.setChatUserData(data));
                }
            })
    }, [toggleTab]);
    let i = 0;
    function clearChat() {
        let f = confirm("are you sure to clear chat?")
        if (f) {
            dispatch(deleteAllChat(toggleTab))
                .then(unwrapResult)
                .then((obj) => {
                    console.log(obj);
                    if (obj.success == true) {
                        dispatch(deleteAllChat(users?.id))
                            .then(unwrapResult)
                            .then((data) => {
                                dispatch(messageAction.setDeleteStart());
                                toast.success(data.message)
                            })
                    }
                })

        }
    }
    console.log("i is", i);
    return (
        <>
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
                        {(item?.userId !== users?.id || item?.user?.id !== users?.id) && item?.userId === toggleTab &&
                            <div className='admin_incomming_message'>
                                <h5>{chat_user_data?.fname + " " + chat_user_data?.lname}</h5>
                                <p>{item?.content}</p>
                            </div>}
                        {(item?.userId === users?.id || item?.user?.id === users?.id) &&
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