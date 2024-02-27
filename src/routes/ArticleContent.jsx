import React from 'react'
import { useLocation } from 'react-router-dom'

const ArticleContent = () => {
  const article = useLocation();
  return (
    <>
      <div className="post_container">
        <div className="post_heading">
          <h1>write post heading here</h1>
        </div>
        <div className="article_img">
          <img src="image/college.jpg" alt="" />
          <h2>sub heading</h2>
        </div>
        <div className="post_user_details">

        </div>
        <div className="post_content">
          
        </div>
        <div className="post_comment">
          
        </div>
      </div>
    </>
  )
}

export default ArticleContent