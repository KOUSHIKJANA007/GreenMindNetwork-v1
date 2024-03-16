import React, { useEffect, useState } from 'react'
import SocialPostItem from './SocialPostItem';
import { useDispatch, useSelector } from 'react-redux';
import SocialPostContent from './SocialPostContent';
import { getSocialPostByNgo, socialPostAction } from '../store/socialImageDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const NgoPhotos = ({ userNgo }) => {
  console.log("/..xz;xz;cx",userNgo);
  const dispatch=useDispatch();
  const{users}=useSelector((store)=>store.user);
  const { socialPosts, isDelete, isCreate } = useSelector((store) => store.socialPost);

  useEffect(()=>{
    dispatch(getSocialPostByNgo(userNgo?.id))
    .then(unwrapResult)
    .then((data)=>{
      console.log("poooooo",data);
      if(data?.length== "0"){
        dispatch(socialPostAction.setSocialPost(null));
        return;
      }
      dispatch(socialPostAction.setSocialPost(data));
    })
    .catch((err)=>{
      toast.error(err.message)
    })
    dispatch(socialPostAction.deleteDone())
    dispatch(socialPostAction.createDone())
  }, [isDelete, isCreate])
  return (
    <div className='ngo_photos_container'>
      {userNgo?.user?.id == users?.id && <SocialPostItem ngoId={userNgo?.id}/>}
  
   <div className="ngo_photos_content_container">
       {socialPosts?.map((item)=>
         <SocialPostContent key={item.id} socialPosts={item} />
       )}
   </div>
    </div>
  )
}

export default NgoPhotos
 
