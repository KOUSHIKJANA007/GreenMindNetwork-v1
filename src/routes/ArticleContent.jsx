import React, { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { BASE_URL } from '../store/helper';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, postAction } from '../store/postDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import CreateComment from '../components/CreateComment';
import FetchComment from '../components/FetchComment';

const ArticleContent = () => {

  const { singlePost } = useSelector((store) => store.post)
  const { isLogin } = useSelector((store) => store.user)
  const { postId } = useParams();
  const dispatch = useDispatch()
  document.title = singlePost?.title
  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getPostById(postId))
      .then(unwrapResult)
      .then((data) => {
        dispatch(postAction.setSinglePost(data))

      })
      .catch((err) => {
        toast.error({ err })
      })
  }, [])
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
          <p>post by <span><Link to={`/user-content/${singlePost?.user?.id}`}>{singlePost?.user?.fname + " " + singlePost?.user?.lname}</Link></span> on <span>{'0' + month + '/0' + day + '/' + year}</span></p>
          <hr className='post_horizon' />
        </div>
        <div className="post_content" dangerouslySetInnerHTML={sanitizedData()}>

        </div>
        {
          isLogin &&

          <div className="post_comment_input">
            <CreateComment postId={postId} />
          </div>
        }
        {
          isLogin &&
          <div className="post_comments">
            <FetchComment postId={postId} />
          </div>
        }
      </div>
    </>
  )
}

export default ArticleContent