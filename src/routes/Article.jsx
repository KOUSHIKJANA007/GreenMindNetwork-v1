import React from 'react'
import ArticleItem from '../components/ArticleItem'
import { useSelector } from 'react-redux'

const Article = () => {
  const articles = useSelector((store) => store.article);
  
  return (
    <>
      <div className="article_container">

        {articles.map((article) =>
          <ArticleItem article={article} key={article.id} />
        )}

      </div>
    </>
  )
}

export default Article