import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar'
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoCreateOutline } from 'react-icons/io5';
import { postAction, postByUser, searchPost } from '../store/postDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import UserArticleItem from '../components/UserArticleItem';
import { toast } from 'react-toastify';
import { Pagination } from '../components/Pagination';

const UserPosts = () => {
    const { posts, loading, DeletePost } = useSelector((store) => store.post);
    const { users } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageNumber = (index) => {
        setPageNumber(index)
    }
    useEffect(() => {
        window.scroll(0, 0);
        dispatch(postByUser({ pageNumber: pageNumber, userId: users.id }))
            .then(unwrapResult)
            .then((data) => {
                console.log({ data });
                dispatch(postAction.setPost(data))
                dispatch(postAction.setPostCreatedEnd())
                dispatch(postAction.setDeletePostEnd())
            })
            .catch((err) => {
                console.log({ err });
                toast.error(err)
            })
    }, [DeletePost])
   
    return (
        <>
            {loading && <LoadingBar color="#78be20" />}
            <div className="article_container">
                <div className="all_posts_article_container">
                    <div className="post_navigation_button">
                        <button type='submit' className='all_posts' onClick={() => { dispatch(postAction.setPostCreatedDone()) }}><Link to="/articles">all posts</Link></button>
                        <button type='submit' className='my_posts'><Link to="/userposts">my posts</Link></button>
                    </div>
                </div>

                {
                    posts?.content == "" ?
                        <div className="article_display_container_post_not_found">
                            <h1>No posts found</h1>
                        </div>
                        :
                        <div className="article_display_container">
                            {posts?.content?.map((article) =>
                                <UserArticleItem article={article} key={article.id} />
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

export default UserPosts