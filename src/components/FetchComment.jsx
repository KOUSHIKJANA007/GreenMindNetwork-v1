import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commentAction, getCommentByPost } from '../store/commentDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import CommentItem from './CommentItem';

const FetchComment = ({ postId }) => {
    const dispatch = useDispatch();
    const { isComment, comment, isDelete, isEdit } = useSelector((store) => store.comment);
    useEffect(() => {
        dispatch(getCommentByPost(postId))
            .then(unwrapResult)
            .then((data) => {
                dispatch(commentAction.setComment(data))
                dispatch(commentAction.addCommentEnd())
                dispatch(commentAction.deleteStatusEnd())
                dispatch(commentAction.editStatusEnd())
            })
            .catch((err) => {
                toast.error(err)
            })
    }, [isComment, isDelete, isEdit])

    return (
        <>
            {comment == "" ?
                <h2>No Comments</h2>
                :
                comment?.map((item) =>
                    <CommentItem key={item?.id} comment={item} />
                )
            }

        </>
    )
}

export default FetchComment