import React from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../store/helper'
import { useDispatch } from 'react-redux'
import { deletePost, postAction } from '../store/postDetails'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const UserArticleItem = ({ article }) => {
    const dispatch=useDispatch()
    const handleDeletePost=()=>{
        let isDelete=confirm("Do you want to delete this post?")
        if(isDelete){
            dispatch(deletePost(article.id))
                .then(unwrapResult)
                .then((data) => {
                    if (data.success){
                        toast.success(data.message)
                        dispatch(postAction.setDeletePostDone())
                    }
                    else{
                        toast.error(data.message)
                    }
                })
                .catch((err)=>{
                    toast.error(err)
                })
        }
    }
    return (
        <div className='user_article_item_container'>
           <div className="user_article_image_and_content">
                <div className="user_article_image">
                    <img src={BASE_URL + `/api/post/image/${article.imageName}`} alt="" />
                </div>
                <div className="user_article_item_heading">
                    <h1 className='article_title' ><Link to={`/articlecontent/${article.id}`}>{article.title}</Link></h1>
                    <h2 className='article_sub_title'>{article.subTitle}</h2>
                </div>
           </div>
            <div className="user_article_item_buttons">
                <button className='post_update_button' type="submit"><Link to={`/editpost/${article.id}`}>Update</Link></button>
                <button className='post_delete_button' type="submit" onClick={handleDeletePost}><Link to="#">Delete</Link></button>
            </div>
        </div>
    )
}

export default UserArticleItem