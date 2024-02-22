import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom"
import { loginAction, updateUser, uploadUserImage } from "../store/userDetails";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users,userImage } = useSelector((store) => store.user);
    const [editData, setEditData] = useState({});
    const [image, setImage] = useState(null);
    const handleOnChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });

    }
    useEffect(() => {
        setEditData(users)
    }, [])
    const handleSubmitEditData = (e) => {
        e.preventDefault();
        dispatch(updateUser(editData))
        .then(unwrapResult)
            .then((obj) => {
                dispatch(uploadUserImage({image:image,userId:obj.id}))
                    .then((obj) => {
                        console.log("Image",obj);
                    })
                    .catch((err) => {
                        toast.error(err)
                    })
                if (obj.id != null) {
                    toast.success("Edit successfull")
                    dispatch(loginAction.setUser(obj))
                    navigate("/userhome");
                }
                else {
                    toast.error(obj.fname)
                    toast.error(obj.lname)
                    toast.error(obj.email)
                }
            })
            .catch((obj) => console.log({ obj }))


    }
    const handleImageUpload = (event) => {
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    }



    return (
        <>
            <Form encType="multipart/form-data" className="signup_container" onSubmit={handleSubmitEditData}>
                <h1>Edit Profile Details</h1>
                <div className="profile_image">

                    <label htmlFor='file_upload'>
                        <img src={`http://localhost:8080/api/user/image/${users.imageName}`} alt="" />
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
                <div className="signup_button">
                    <button type='submit'>Save</button>
                </div>
            </Form>
        </>
    )
}

export default EditProfile