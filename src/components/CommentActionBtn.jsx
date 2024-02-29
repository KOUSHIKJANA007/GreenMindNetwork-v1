import React from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { commentAction, deleteComment } from '../store/commentDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const CommentActionBtn = ({ toggle, handleToggle, commentId }) => {
    const dispatch=useDispatch();
    const handleDeleteComment=()=>{
        let c=confirm("Are your sure to delete ?")
        if(c){
            dispatch(deleteComment(commentId))
                .then(unwrapResult)
                .then((data) => {
                   toast.success(data.message)
                    dispatch(commentAction.deleteStatusDone())
                })
        }
        
    }
    return (
        <>
            <button type='dropdown' onClick={handleToggle}><CiMenuKebab className='comment_action_icon' /></button>
            <div className={toggle ? "drop_down_content ddopen" : "drop_down_content"}>
                <Link><span><MdEdit className='comm_edit_icon'/></span>edit</Link>
                <Link onClick={()=>{
                    handleDeleteComment()
                    handleToggle()
                }}><span><MdDelete className='comm_delete_icon'/></span>delete</Link>
            </div>
        </>
    )
}

export default CommentActionBtn