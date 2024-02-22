import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserImage, loginAction } from '../store/userDetails';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';

const ProfileBox = ({ users }) => {
    const { userImage } = useSelector((store) => store.user);
    const [toggleProfileCard, setToggleProfileCard] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleProfileCard = () => {
        setToggleProfileCard(true);
    }
    const handleProfileCardCancel = () => {
        setToggleProfileCard(false);
    }
    const handleLogout = () => {
        dispatch(loginAction.doLogout());
        toast.success("Logout successfull");
        navigate("/signin");
    }


    // useEffect(() => {
    //     console.log(users);
    //     dispatch(fetchUserImage(users.imageName))
    //         .then(unwrapResult)
    //         .then((obj) => {
    //             console.log(obj.url);
    //             if (obj.url != null) {
    //                 dispatch(loginAction.setUserImage(obj.url))
    //             }
    //         })
    //         .catch((obj) => {
    //             toast.error(obj)
    //         })
    // }, [userImage])
    let today = new Date();
    let date = new Date(users.dob);
    let age = today.getFullYear() - date.getFullYear();
    console.log("image.....", userImage);
    return (
        <>
            <div className="person_box">
                <Link to="#"><img className="dp_image" src={`http://localhost:8080/api/user/image/${users.imageName}`} alt="" onClick={handleProfileCard} /></Link>
                <Link className='dp_name' to="#" onClick={handleProfileCard}>{users.fname + " " + users.lname}</Link>
            </div>
            <div className={toggleProfileCard ? "profile_card_container open" : "profile_card_container"}>
                <MdClose onClick={handleProfileCardCancel} className='close_btn' />
                <div className="profile_card_logo">
                    <img src={`http://localhost:8080/api/user/image/${users.imageName}`} alt="" />
                </div>
                <div className="profile_card_info">
                    <p className="profile_name"><span>Name</span>{users.fname + " " + users.lname}</p>
                    <p className="profile_dob"><span>DOB</span>{users.dob}</p>
                    <p className="profile_email"><span>Email</span>{users.email}</p>
                    <p className="profile_mobile"><span>Mobile</span>{users.mobile}</p>
                    <p className="profile_joined"><span>Age</span>{age}</p>
                    <div className="profile_card_button">
                        <button type='submit' className="edit_btn" onClick={handleProfileCardCancel} ><Link to="/editprofile">Edit</Link></button>
                        <button className="logout_btn" onClick={() => {
                            handleLogout()
                            handleProfileCardCancel()
                        }}>Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileBox