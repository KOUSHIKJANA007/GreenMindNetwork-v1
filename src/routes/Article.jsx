import React, { useEffect, useRef, useState } from 'react'
import ArticleItem from '../components/ArticleItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, postAction, postByUser, searchPost } from '../store/postDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import LoadingBar from 'react-top-loading-bar';
import { Pagination } from '../components/Pagination';
import { validationAction } from '../store/OtpValidation';

const Article = () => {
  const { progress } = useSelector((store) => store.validation);
  const { posts, loading, isPostCreate, DeletePost } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  const searchElement = useRef();
  const [pageNumber, setPageNumber] = useState(0);
  const handlePageNumber = (index) => {
    setPageNumber(index)
  }
  useEffect(() => {
    dispatch(validationAction.setProgress(50))
    dispatch(fetchPosts(pageNumber))
      .then(unwrapResult)
      .then((data) => {
        dispatch(postAction.setPost(data))
        dispatch(postAction.setPostCreatedEnd())
        window.scroll(0, 0)
      })
      .catch((err) => {
        console.log({ err });
        toast.error(err)
      })
    dispatch(validationAction.setProgress(100))
  }, [isPostCreate, pageNumber, DeletePost])


  const handleSearch = () => {
    dispatch(validationAction.setProgress(50));
    const keyword = searchElement.current.value;
    console.log(keyword);
    if (!keyword.trim(" ")) {
      toast.error("Please enter anything for search")
    }
    else {
      dispatch(searchPost(keyword))
        .then(unwrapResult)
        .then((data) => {
          dispatch(postAction.setPost(data))
        })
        .catch((err) => {
          console.log({ err });
          toast.error(err)
        })
    }
    dispatch(validationAction.setProgress(100))
  }
  return (
    <>
      {loading && <LoadingBar progress={progress} color="#78be20" />}
      <div className="article_container">
        <div className="all_posts_article_container">
          <div className="post_navigation_button">
            <button type='submit' className='all_posts' onClick={() => { dispatch(postAction.setPostCreatedDone()) }}><Link to="/articles">all posts</Link></button>
            <button type='submit' className='my_posts'><Link to="/userposts">my posts</Link></button>
          </div>
          <div className="search_article_container">
            <input type="text" ref={searchElement} placeholder='Search Posts Here' className='search_article' name="search" id="search" />
            <button type='submit' className='search_article_button' onClick={handleSearch}><span><FaSearch className='search_icon' /></span>search</button>
          </div>
        </div>

        {
          posts.content=="" ?
            <div className="article_display_container_post_not_found">
              <h1>No posts found</h1>
            </div>
            :
            <div className="article_display_container">
              {posts?.content?.map((article) =>
                <ArticleItem article={article} key={article?.id} />
              )}
            </div>}
        <div className="create_post_button">
          <button><Link to="/createpost"><span><IoCreateOutline className='create_post_icon' /></span>create post</Link></button>
        </div>
        <Pagination handlePageNumber={handlePageNumber} posts={{ posts }} />
      </div>
    </>
  )
}

export default Article