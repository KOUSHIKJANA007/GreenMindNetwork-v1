import React, { useState } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { BASE_URL } from '../store/helper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSocialPost, socialPostAction } from '../store/socialImageDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const SocialPostContent = ({ socialPosts }) => {
    const dispatch = useDispatch();
    const {users}=useSelector((store)=>store.user);
    const [toggle, setToggle] = useState(false);
    const handleToggle = () => {
        setToggle(!toggle);
    }
    const handleDeletePost=()=>{
        dispatch(deleteSocialPost(socialPosts.id))
        .then(unwrapResult)
        .then((data)=>{
            dispatch(socialPostAction.deletePending());
            toast.success(data.message)
        })
    }
    return (
        <div className='social_post_content_container'>
            <div className="social_post_content">
                <div className="social_post_content_caption">
                    <h4>{socialPosts?.caption}</h4>
                </div>
                <div className="social_post_content_img">
                    <img src={BASE_URL +`/api/socialImage/image/${socialPosts?.image}`} alt="" />
                </div>
            </div>
            <div className="social_post_conten_option">
               {socialPosts?.user?.id==users?.id && <CiMenuKebab onClick={handleToggle}className='social_post_conten_option_toggle' />}
                <div className={toggle ? 'social_post_conten_dropdown open' : 'social_post_conten_dropdown'}>
                    <li onClick={handleToggle} ><Link>Edit</Link></li>
                    <li onClick={() => {
                        handleToggle()
                        handleDeletePost()
                    }}><Link>Delete</Link></li>
                </div>
            </div>
           
        </div>
    )
}

export default SocialPostContent