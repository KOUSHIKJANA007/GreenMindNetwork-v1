import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../store/userDetails';
import { toast } from 'react-toastify';
import { BASE_URL } from '../store/helper';
import { validationAction } from '../store/OtpValidation';
import LoadingBar from 'react-top-loading-bar';

const ProfileBox = ({ users }) => {
    const { progress } = useSelector((store) => store.validation);
    const { loading } = useSelector((store) => store.user);
    const [toggleProfileCard, setToggleProfileCard] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleProfileCard = () => {
        setToggleProfileCard(!toggleProfileCard);
    }
    const handleLogout = () => {
        dispatch(validationAction.setProgress(50));
        dispatch(loginAction.doLogout());
        toast.success("Logout successfull");
        navigate("/signin");
        dispatch(validationAction.setProgress(100));
    }

    let today = new Date();
    let date = new Date(users?.dob);
    let age = today.getFullYear() - date.getFullYear();
    return (
        <>
            {loading && <LoadingBar color="#78be20" progress={progress} />}
            <div className="person_box">

                <Link to="#"><img className="dp_image" src={BASE_URL + "/api/user/image/" + users?.imageName} alt="" onClick={handleProfileCard} /></Link>

                <Link className='dp_name' to="#" onClick={handleProfileCard}>{users?.fname + " " + users?.lname}</Link>
            </div>
            <div className={toggleProfileCard ? "profile_card_container person_box_open" : "profile_card_container"}>
                <MdClose onClick={handleProfileCard} className='close_btn' />
                <div className="profile_card_logo">
                    <img src={BASE_URL + "/api/user/image/" + users?.imageName} alt="" />
                </div>
                <div className="profile_card_info">
                    <p className="profile_name"><span>Name</span>{users?.fname + " " + users?.lname}</p>
                    <p className="profile_dob"><span>DOB</span>{users?.dob}</p>
                    <p className="profile_email"><span>Email</span>{users?.email}</p>
                    <p className="profile_mobile"><span>Mobile</span>{users?.mobile}</p>
                    <p className="profile_joined"><span>Age</span>{age}</p>
                    <div className="profile_card_button">
                        <button type='submit' className="edit_btn" onClick={handleProfileCard} ><Link to="/editprofile">Edit</Link></button>
                        <button className="logout_btn" onClick={() => {
                            handleLogout()
                            handleProfileCard()
                        }}>Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileBox