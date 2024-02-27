import React from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../store/helper';

const ArticleItem = ({ article }) => {
    
    return (
        <div className='article_item_container'>
            <div className="article_image">
                <img  src={BASE_URL + `/api/post/image/${article.imageName}`} alt="" />
            </div>
            <div className="article_item_heading">
                <h1 className='article_title'><Link to={`/articlecontent/${article.id}`}>{article.title}</Link></h1>
                <h2 className='article_sub_title'>{article.subTitle}</h2>
            </div>
        </div>
    )
}

export default ArticleItem