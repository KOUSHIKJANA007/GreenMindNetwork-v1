import React from 'react'
import { useLocation } from 'react-router-dom'

const ArticleContent = () => {
  const article = useLocation();
  return (
    <>
      <div className="article_container">
        <div className="article_img">
          <img src="image/college.jpg" alt="" />
        </div>
        <div className="article_content">
          
        </div>
      </div>
    </>
  )
}

export default ArticleContent