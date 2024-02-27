import React from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../store/helper'

const UserArticleItem = ({ article }) => {
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
                <button className='post_comment_button' type="submit"><Link to="">Comment</Link></button>
                <button className='post_update_button' type="submit"><Link to="">Update</Link></button>
                <button className='post_delete_button' type="submit"><Link to="">Delete</Link></button>
            </div>
        </div>
    )
}

export default UserArticleItem