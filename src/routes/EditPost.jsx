import JoditEditor from 'jodit-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Form, useNavigate, useParams } from 'react-router-dom'
import { getPostById, postAction, updatePost, uploadPostImage } from '../store/postDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const EditPost = () => {
    document.title="Edit Article"
    const editor = useRef();
    const navigate = useNavigate()
    const { postId } = useParams();
    const dispatch = useDispatch();
    const [postData, setPostData] = useState('');
    const [content, setContent] = useState();
    const [image, setImage] = useState('');
    useEffect(() => {
        dispatch(getPostById(postId))
            .then(unwrapResult)
            .then((data) => {
                setPostData(data);
            })
            .catch((err) => {
                toast.error({ err })
            })
    }, [])

    console.log("postData", postData);
    const handleOnChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value })
    }
    const handleContent = (data) => {
        setPostData({ ...postData, 'content': data });
    }
    const handleOnChangeImage = (e) => {
        setImage(e.target.files[0]);
    }
    const handlePostEditform = (e) => {
        e.preventDefault();

        dispatch(updatePost({ postData: postData, postId: postId }))
            .then(unwrapResult)
            .then((data) => {
                if (data.id != null) {
                    dispatch(uploadPostImage({ image: image, postId: postId }))
                        .then(unwrapResult)
                        .then((obj) => {
                            if (!obj.id) {
                                toast.error("Image not uploaded")
                            }
                        })
                    dispatch(postAction.setPostCreatedDone());
                    toast.success("post updated successfully");
                    navigate("/userposts");
                }
                else {
                    toast.error(data.title);
                    toast.error(data.subTitle);
                    toast.error(data.content);
                }

            })
            .catch((err) => {
                toast.error(err.message)
            })
    }
    return (
        <div className="post_container">
            <h2>Enter Post data Here</h2>
            <Form onSubmit={handlePostEditform} className="post_data">
                <div className="post_input">
                    <label htmlFor="Post_heading">post heading</label>
                    <input className="Post_heading" type="text" name="title" value={postData?.title} onChange={handleOnChange} id="Post_heading" required />
                </div>
                <div className="post_input">
                    <label htmlFor="Post_sub_heading">post sub heading</label>
                    <input className="Post_sub_heading" type="text" name="subTitle" value={postData?.subTitle} onChange={handleOnChange} id="Post_sub_heading" required />
                </div>
                <div className="post_input">
                    <label htmlFor="Post_image">post image</label>
                    <input className="Post_image" type="file"  name="image" onChange={handleOnChangeImage} id="Post_image" />
                </div>
                <div className="post_input">
                    <label htmlFor="Post_content">enter post content</label>

                    <JoditEditor
                        ref={editor}
                        value={postData?.content}
                        onChange={handleContent}
                    />
                </div>
                <div className="post_buttons">
                    <button type='submit' className="post_button">update</button>
                    <button type='reset' className="reset_button">Reset</button>
                </div>
            </Form>
        </div>

    )
}

export default EditPost