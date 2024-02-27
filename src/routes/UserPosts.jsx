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
    const { posts, loading } = useSelector((store) => store.post);
    const { users } = useSelector((store) => store.user);
    const searchElement = useRef();
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageNumber = (index) => {
        setPageNumber(index)
    }
    useEffect(() => {
        dispatch(postByUser({ pageNumber: pageNumber, userId: users.id }))
            .then(unwrapResult)
            .then((data) => {
                console.log({ data });
                dispatch(postAction.setPost(data))
                dispatch(postAction.setPostCreatedEnd())
            })
            .catch((err) => {
                console.log({ err });
                toast.error(err)
            })
    }, [])
    const handleSearch = () => {
        const keyword = searchElement.current.value;
        if (!keyword) {
            toast.error("Please enter anything for search")
        }
        else {
            dispatch(searchPost(keyword))
                .then(unwrapResult)
                .then((data) => {
                    console.log("data", { data });
                    dispatch(postAction.setPost(data))
                })
                .catch((err) => {
                    console.log({ err });
                    toast.error(err)
                })
        }

    }
    console.log("post data for search", posts);
    return (
        <>
            {loading && <LoadingBar color="#78be20" />}
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
                    !posts ?
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