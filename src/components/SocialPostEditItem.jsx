import React, { useEffect, useState } from 'react'
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import { Form } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";
import { getSocialPostById, socialPostAction, updateSocialPost, uploadSocialPostImage } from '../store/socialImageDetails';
import { BASE_URL } from '../store/helper';

const SocialPostEditItem = ({ socialId,handleEditPost,openEdit }) => {
    const [imagePre, setImagePre] = useState('');
    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');
    const dispatch = useDispatch();
    const uploader = Uploader({
        apiKey: "free" // Get production API keys from Bytescale
    });
    const options = { multi: false };
    useEffect(()=>{
        dispatch(getSocialPostById(socialId))
        .then(unwrapResult)
        .then((data)=>{
            setCaption(data);
           setImagePre(BASE_URL+`/api/socialImage/image/${data.image}`);
        })
    },[])
    const handleData = (data) => {
        setImage(data.file)
        setImagePre(data.fileUrl)
    }
    const handleCaption = (e) => {
        setCaption({ ...caption, [e.target.name]: e.target.value })
    }
    const handleSubmitData=(e)=>{
        e.preventDefault();
        if (document.getElementById('caption').value.trim() == '' && caption?.caption=="") {
            toast.error("Enter caption")
            return;
        }
        dispatch(updateSocialPost({caption:caption,socialId:socialId}))
        .then(unwrapResult)
        .then((data)=>{
            dispatch(uploadSocialPostImage({ image: image, socialId: data?.id }))
                .then(unwrapResult)
                .then((obj) => {
                    if (obj.id == '') {
                        toast.error("error in image upload")
                    }
                })
                toast.success("Post edited");
                dispatch(socialPostAction.updatePending());
        }).catch((err) => {
            toast.error(err.message)
        })
    }
  return (
      <Form onSubmit={handleSubmitData} className={openEdit ? "social_post_edit_container open" :"social_post_edit_container"}>
          <div className="social_post_caption">
              <span><IoMdClose onClick={handleEditPost} className='social_post_close_button' /></span>
              <label htmlFor="caption">give caption of your post</label>
              <input type="text" id='caption' name='caption'value={caption?.caption} onChange={handleCaption} />
          </div>
          <UploadButton uploader={uploader}
              options={options}
              onComplete={files => (files.map(x => handleData(x.originalFile)))}>
              {({ onClick }) =>
                  <button className="social_post_button" onClick={onClick}>
                      select image
                  </button>
              }
          </UploadButton>
          <div className="social_edit_post_caption_preview">
              <img src={imagePre} alt="" />
          </div>
          <div className="social_post_submit_button" >
              <button type='submit' onClick={handleEditPost}>Upload a image</button>
          </div>
      </Form>
  )
}

export default SocialPostEditItem