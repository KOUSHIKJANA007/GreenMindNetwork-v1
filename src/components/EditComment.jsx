import React, { useEffect, useRef, useState } from 'react'
import { IoMdSend } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { commentAction, updateComment } from '../store/commentDetails';
import { unwrapResult } from '@reduxjs/toolkit';

const EditComment = ({ comment, handleEditForm }) => {
    const dispatch = useDispatch();
    const [editInput, setEditInput] = useState('');

    useEffect(() => {
        setEditInput(comment);
    }, [])
    const handleOnChange = (e) => {
        setEditInput({ ...editInput, [e.target.name]: e.target.value })
    }
    const handleEditComment = (e) => {
        dispatch(updateComment({content:editInput,commentId:comment.id}))
        .then(unwrapResult)
        .then((data)=>{
            if(!data){
                toast.error("somthing wrong");
                return;
            }
            dispatch(commentAction.editStatusStart());
            toast.success("Edit successfully")
        })
        .catch((err)=>{
            toast.error(err)
        })

    }
    return (
        <div className='comment_container'>
            <div className="comment_input">
                <ReactTextareaAutosize type="text" onChange={handleOnChange} value={editInput.content} name='content' placeholder='Please give your opinion' />
            </div>
            <div className="comment_Button">
                <button type='submit' onClick={()=>{
                    handleEditForm()
                    handleEditComment()
                    }}><IoMdSend className='comment_Button_icon' /></button>
            </div>
        </div>
    )
}

export default EditComment