import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commentAction, getCommentByPost } from '../store/commentDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import CommentItem from './CommentItem';

const FetchComment = ({ postId }) => {
    const dispatch = useDispatch();
    const { isComment, comment } = useSelector((store) => store.comment);
    console.log("comment", comment);
    useEffect(() => {
        dispatch(getCommentByPost(postId))
            .then(unwrapResult)
            .then((data) => {

                console.log("hrllo");
                dispatch(commentAction.setComment(data))
                dispatch(commentAction.addCommentEnd())

            })
            .catch((err) => {
                toast.error(err)
            })
    }, [isComment])

    return (
        <>
           {
            comment?.map((item)=>
                  <CommentItem comment={item}/>
            )
           }
        </>
    )
}

export default FetchComment