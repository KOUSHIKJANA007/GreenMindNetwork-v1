import React, { useRef } from 'react'
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../store/helper';
import { unwrapResult } from '@reduxjs/toolkit';
import { commentAction, createComment } from '../store/commentDetails';
import { toast } from 'react-toastify';

const CreateComment = ({ postId }) => {
    const dispatch = useDispatch();
    const { users } = useSelector((store) => store.user);
    const commentInput = useRef();
    const handleComment = () => {
        const commentData = commentInput.current.value;
        console.log("comment", commentData);
        dispatch(createComment({ postId: postId, userId: users.id, commentData: commentData }))
            .then(unwrapResult)
            .then((data) => {
                if (!commentData.trim(" ")) {
                    toast.error("Comment not be null")
                    return;
                } else if (data.id) {
                    dispatch(commentAction.addCommentDone());
                    toast.success("comment posted")
                    commentInput.current.value="";
                }
            })
            .catch((err)=>{
                toast.error(err)
            })
    }
    return (
        <div className='comment_container'>
            <div className="user_image">
                <img src={BASE_URL + `/api/post/image/${users.imageName}`} alt="" />
            </div>
            <div className="comment_input">
                <textarea type="text" ref={commentInput} name='comment' placeholder='Please give your opinion' />
            </div>
            <div className="comment_Button">
                <button type='submit' onClick={handleComment}><IoMdSend className='comment_Button_icon' /></button>
            </div>
        </div>
    )
}

export default CreateComment