import React, { useEffect, useState } from 'react'
import SocialPostItem from './SocialPostItem';
import { useDispatch, useSelector } from 'react-redux';
import SocialPostContent from './SocialPostContent';
import { getSocialPostByNgo, socialPostAction } from '../store/socialImageDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const NgoPhotos = ({ userNgo }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.user);
  const { isDelete, isCreate, isUpdate, isImageUpload, socialPosts } = useSelector((store) => store.socialPost);
  useEffect(() => {
    dispatch(getSocialPostByNgo(userNgo?.id))
      .then(unwrapResult)
      .then((data) => {
        dispatch(socialPostAction.setTotalSocialPost(data?.length));
        if (data?.length == "0") {
          dispatch(socialPostAction.setSocialPost(null));
          return;
        }
        dispatch(socialPostAction.setSocialPost(data));
      })
      .catch((err) => {
        toast.error(err.message)
      })
    dispatch(socialPostAction.deleteDone())
    dispatch(socialPostAction.createDone())
    dispatch(socialPostAction.updateDone())
    dispatch(socialPostAction.imageDone())
    console.log("fetched");
    console.log(socialPosts);
  }, [isDelete, isCreate, isUpdate, isImageUpload])

  return (
    <div className='ngo_photos_container'>
      {userNgo?.user?.id == users?.id && <SocialPostItem ngoId={userNgo?.id} />}

      <div className="ngo_photos_content_container">
        {socialPosts?.map((item) =>
          <SocialPostContent key={item.id} socialPosts={item} />
        )}
      </div>
    </div>
  )
}

export default NgoPhotos

