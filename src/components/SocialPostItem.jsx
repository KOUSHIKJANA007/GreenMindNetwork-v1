import React, {useState } from 'react'

import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import { Form } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSocialPost, socialPostAction, uploadSocialPostImage } from '../store/socialImageDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';


const SocialPostItem = ({ ngoId }) => {
    const [imagePre, setImagePre] = useState('');
    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');
    const dispatch = useDispatch();
    const uploader = Uploader({
        apiKey: "free" // Get production API keys from Bytescale
    });
    const options = { multi: false };
    const handleData = (data) => {
        setImage(data.file)
        setImagePre(data.fileUrl)
    }
    const handleCaption = (e) => {
        setCaption({ ...caption, [e.target.name]: e.target.value })
        console.log(caption);
    }
    const handleSubmitData = (e) => {
        e.preventDefault();
        if (document.getElementById('caption').value.trim()==''){
            toast.error("Enter caption")
            return;
        }
        if (image==''){
            toast.error("upload image !!")
            return;
        }
        dispatch(createSocialPost({ caption: caption, ngoId: ngoId }))
            .then(unwrapResult)
            .then((data) => {
                dispatch(uploadSocialPostImage({ image: image, socialId: data?.id }))
                    .then(unwrapResult)
                    .then((obj) => {
                        if(obj.id==''){
                            toast.error("error in image upload")
                        }
                        setImage('')
                    })
                    .catch((err) => {
                        toast.error(err)
                    })
                    if(data.id==''){
                        toast.error("post not upload");
                    }
                    else{
                        toast.success("Post uploaded successfully");
                        document.getElementById('caption').value="";
                        dispatch(socialPostAction.createPending());
                    }
            })
            .catch((err) => {
                toast.error(err)
            })
    }
   
    return (
        <Form onSubmit={handleSubmitData} className='social_post_container'>
            <div className="social_post_caption">
                <label htmlFor="caption">give caption of your post</label>
                <input type="text" id='caption' name='caption' onChange={handleCaption} />
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
            <div className="social_post_caption_preview">
                <img src={imagePre} alt="" />
            </div>
            <div className="social_post_submit_button" >
                <button type='submit'>Upload a image</button>
            </div>
        </Form>
    )
}

export default SocialPostItem