import React, { useState } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { BASE_URL } from '../store/helper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSocialPost, socialPostAction } from '../store/socialImageDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import SocialPostEditItem from './SocialPostEditItem';

const SocialPostContent = ({ socialPosts }) => {
   
    const dispatch = useDispatch();
    const {users}=useSelector((store)=>store.user);
    const [toggle, setToggle] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    console.log("users", users);
    console.log("users post", socialPosts);
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
    const handleEditPost = () => {
        setOpenEdit(!openEdit);
    }
    return (
        <div className='social_post_content_container'>
            <div className="social_post_content">
                <div className="social_post_content_caption">
                    <h4>{socialPosts?.caption}</h4>
                </div>
                <div className="social_post_content_img">
                    <img loading='lazy' src={BASE_URL +`/api/socialImage/image/${socialPosts?.image}`} alt="" />
                </div>
            </div>
            <div className="social_post_conten_option">
                {socialPosts?.ngo?.user?.id == users?.id && <CiMenuKebab onClick={handleToggle}className='social_post_conten_option_toggle' />}
                <div className={toggle ? 'social_post_conten_dropdown open' : 'social_post_conten_dropdown'}>
                    <li onClick={()=>{handleToggle()
                    handleEditPost()}} ><Link>Edit</Link></li>
                    <li onClick={() => {
                        handleToggle()
                        handleDeletePost()
                    }}><Link>Delete</Link></li>
                </div>
                {socialPosts?.ngo?.user?.id == users?.id && <SocialPostEditItem handleEditPost={handleEditPost} openEdit={openEdit} socialId ={socialPosts?.id}/>}
            </div>
           
        </div>
    )
}

export default SocialPostContent