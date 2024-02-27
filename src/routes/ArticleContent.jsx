import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { BASE_URL } from '../store/helper';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, postAction } from '../store/postDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';

const ArticleContent = () => {
  const { singlePost } = useSelector((store) => store.post)
  const { postId } = useParams();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPostById(postId))
      .then(unwrapResult)
      .then((data) => {
        dispatch(postAction.setSinglePost(data))
        
      })
      .catch((err) => {
        toast.error({ err })
      })
  }, [])
  console.log("single post", singlePost);
  let date = new Date(singlePost.postDate)
  let month = date.getMonth() + 1;
  let day = date.getDay();
  let year = date.getFullYear()
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(singlePost.content)
  })
  return (
    <>
      <div className="post_container">
        <div className="post_heading">
          <h1>{singlePost?.title}</h1>
        </div>
        <div className="article_img">
          <img className='post_image' src={BASE_URL + `/api/post/image/${singlePost?.imageName}`} alt="" />
          <h2 >{singlePost?.subTitle}</h2>
        </div>
        <div className="post_user_details">
          <p>post by <span>{singlePost?.user?.fname + " " + singlePost?.user?.lname}</span> on <span>{'0' + month + '/0' + day + '/' + year}</span></p>
          <hr className='post_horizon' />
        </div>
        <div className="post_content" dangerouslySetInnerHTML={sanitizedData()}>
          
        </div>
        <div className="post_comment">

        </div>
      </div>
    </>
  )
}

export default ArticleContent