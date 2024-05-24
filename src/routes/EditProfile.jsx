import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom"
import { loginAction, updateUser, uploadUserImage } from "../store/userDetails";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { BASE_URL } from "../store/helper";
import LoadingBar from "react-top-loading-bar";
import { RiImageEditFill } from "react-icons/ri";


const EditProfile = () => {
    document.title = "Edit Profile"
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users, loading } = useSelector((store) => store.user);
    const [editData, setEditData] = useState('');
    const [image, setImage] = useState('');
    const [imagePre, setImagePre] = useState('');
    const handleOnChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });

    }
    useEffect(() => {
        window.scroll(0, 0)
        setEditData(users)
        setImagePre(BASE_URL+"/api/user/image/"+users?.imageName);
    }, []);
    const handleSubmitEditData = (e) => {
        e.preventDefault();

        dispatch(updateUser(editData))
            .then(unwrapResult)
            .then((obj) => {
                dispatch(uploadUserImage({ image: image, userId: users.id }))
                    .then((data) => {
                        if (data.payload != undefined) {
                            dispatch(loginAction.setEditDone())
                            toast.success("Edit successfull")
                        }
                        else {
                            toast.error(data.payload)
                        }
                    })
                    .catch((err) => {
                        toast.error(err)
                    })
                if (obj.id != null) {
                   
                    dispatch(loginAction.setEditDone())
                    navigate("/userhome");
                }
                else {
                    toast.error(obj.fname)
                    toast.error(obj.lname)
                    toast.error(obj.email)
                }
            })
            .catch((obj) => toast.error(obj.message))

    }
    const handleImageUpload = (event) => {
        if (event.target.files[0].type === "image/webp" || event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/png" || event.target.files[0].type === "image/gif"){
            setImage(event.target.files[0]);
            setImagePre(URL.createObjectURL(event.target.files[0]));
        }
        else{
            toast.error("upload .jpg, .jpeg, .png, .gif,.webp file");
        }
       
    }

    return (
        <>
            {loading && <LoadingBar color="#78be20" />}
            <Form encType="multipart/form-data" className="signup_container" onSubmit={handleSubmitEditData}>
                <h1>Edit Profile Details</h1>
                <div className="profile_image">
                    <label htmlFor='file_upload' className="profile_image_edit">

                    <RiImageEditFill className="profile_image_edit_icon"/>
                    </label>
                    <label >
                        <img src={imagePre} alt="" />
                    </label>
                    <input type="file" id='file_upload' name="image" onChange={handleImageUpload} />

                </div>
                <div className="signup_input_box_name">
                    <div className='fname_input'>
                        <label htmlFor="fname">first name</label>
                        <input className='signup_input' type="text" name="fname" value={editData && editData.fname} onChange={handleOnChange} id='fname' />
                    </div>
                    <div className='lname_input'>
                        <label htmlFor="lname">last name</label>
                        <input className='signup_input' type="text" name="lname" value={editData && editData.lname} onChange={handleOnChange} id='lname' />
                    </div>

                </div>
                <div className="signup_input_box">
                    <label htmlFor="email">email</label>
                    <input className='signup_input' type="email" name="email" value={editData && editData.email} onChange={handleOnChange} id='email' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="mobile">mobile</label>
                    <input className='signup_input' type="number" name="mobile" value={editData && editData.mobile} onChange={handleOnChange} id='mobile' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="date">DOB</label>
                    <input className='signup_input' type="date" name="dob" value={editData && editData.dob} onChange={handleOnChange} id='date' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="youtubeLink">YouTube Link</label>
                    <input className='signup_input' type="text" name="youtubeLink" value={editData && editData.youtubeLink} onChange={handleOnChange} id='youtubeLink' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="instagramLink">Instagram Link</label>
                    <input className='signup_input' type="text" name="instagramLink" value={editData && editData.instagramLink} onChange={handleOnChange} id='instagramLink' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="twitterLink">Twitter Link</label>
                    <input className='signup_input' type="text" name="twitterLink" value={editData && editData.twitterLink} onChange={handleOnChange} id='twitterLink' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="facebookLink">Facebook Link</label>
                    <input className='signup_input' type="text" name="facebookLink" value={editData && editData.facebookLink} onChange={handleOnChange} id='facebookLink' />
                </div>
                <div className="signup_button">
                    <button type='submit'>Save</button>
                </div>
            </Form>
        </>
    )
}

export default EditProfile