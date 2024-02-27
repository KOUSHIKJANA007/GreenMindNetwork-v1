import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom"
import { createPost, postAction, uploadPostImage } from "../store/postDetails";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";


const CreatePost = () => {
    const { users } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const editor = useRef(null);
    const [postData, setPostData] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const handleOnChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
        console.log(postData);
    }

    const handleContent=(data)=>{
        setPostData({...postData,'content':data})
    }
    const handleOnChangeImage = (e) => {
        setImage(e.target.files[0])
        console.log(e.target.files[0]);
    }
    const handlePostform = async (e) => {
        e.preventDefault();



        dispatch(createPost({ postData: postData, userId: users.id }))
            .then((obj) => {
                if (obj.payload?.id != null) {
                    dispatch(uploadPostImage({ image: image, postId: obj.payload?.id }))
                        .then(unwrapResult)
                        .then((res) => {
                            if (res?.id == null) {
                                toast.error("Image not uploaded")
                            }
                        })
                        .catch((err) => {
                            toast.error({ err })
                        })
                    dispatch(postAction.setPostCreatedDone())
                    toast.success("post created successfully")
                    navigate("/articles")
                }
                else {
                    console.log({ obj });
                    toast.error(obj.payload?.title)
                    toast.error(obj.payload?.subTitle)
                    toast.error(obj.payload?.content)
                }
            })
            .catch((err) => {
                toast.error({ err })
            })


    }
    return (
        <>
            <div className="post_container">
                <h2>Enter Post data Here</h2>
                <Form onSubmit={handlePostform} className="post_data">
                    <div className="post_input">
                        <label htmlFor="Post_heading">post heading</label>
                        <input className="Post_heading" type="text" name="title" onChange={handleOnChange} id="Post_heading" required />
                    </div>
                    <div className="post_input">
                        <label htmlFor="Post_sub_heading">post sub heading</label>
                        <input className="Post_sub_heading" type="text" name="subTitle" onChange={handleOnChange} id="Post_sub_heading" required />
                    </div>
                    <div className="post_input">
                        <label htmlFor="Post_image">post image</label>
                        <input className="Post_image" type="file" name="image" onChange={handleOnChangeImage} id="Post_image" required />
                    </div>
                    <div className="post_input">
                        <label htmlFor="Post_content">enter post content</label>
                        {/* <textarea className="Post_content" type="text" name="content" onChange={handleOnChange} id="Post_content" rows={20} required /> */}

                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={handleContent}
                        />
                    </div>
                    <div className="post_buttons">
                        <button type='submit' className="post_button">Post</button>
                        <button type='reset' className="reset_button">Reset</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default CreatePost