import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdClose } from "react-icons/md";
import { doLogOut } from '../auth';
import { toast } from 'react-toastify';

const ProfileBox = ({ user }) => {
    const [toggleProfileCard, setToggleProfileCard] = useState(false);
    const navigate = useNavigate();


    const handleEdit = () => {
        setToggleProfileCard(false)
    }
    const handleProfileCard = () => {
        setToggleProfileCard(true);
    }
    const handleProfileCardCancel = () => {
        setToggleProfileCard(false);
    }
    const handleLogout = () => {
        doLogOut(() => {
            // toast.success("Logout successfull")
            navigate("/signin")
            window.location.reload()
        })
    }
    let today=new Date();
    let dob=new Date(user.dob);
    let age =today.getFullYear()-dob.getFullYear();
    return (
        <>
            <div className="person_box">
                <Link to="#"><img className="dp_image" src="image/college.jpg" alt="" onClick={handleProfileCard} /></Link>
                <Link className='dp_name' to="#" onClick={handleProfileCard}>{user.fname+" "+user.lname}</Link>
            </div>
            <div className={toggleProfileCard ? "profile_card_container open" : "profile_card_container"}>
                <MdClose onClick={handleProfileCardCancel} className='close_btn' />
                <div className="profile_card_logo">
                    <img src="image/college.jpg" alt="" />
                </div>
                <div className="profile_card_info">
                    <p className="profile_name"><span>Name</span>{user.fname + " " + user.lname}</p>
                    <p className="profile_dob"><span>DOB</span>{user.dob}</p>
                    <p className="profile_email"><span>Email</span>{user.email}</p>
                    <p className="profile_mobile"><span>Mobile</span>{user.mobile}</p>
                    <p className="profile_joined"><span>Age</span>{age}</p>
                    <div className="profile_card_button">
                        <button type='submit' className="edit_btn" onClick={handleEdit}><Link to="/editprofile">Edit</Link></button>
                        <button className="logout_btn" onClick={handleLogout} >Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileBox