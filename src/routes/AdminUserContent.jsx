
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteUser, fetchUserById, loginAction } from '../store/userDetails'
import { unwrapResult } from "@reduxjs/toolkit";
import { BASE_URL } from "../store/helper";
import { postAction, postByUser } from "../store/postDetails";
import { donationAction, getTotalAmount } from "../store/donationDetails";
import { toast } from "react-toastify";
import blockList, { blockListAction, blockUser, unBlockUser } from "../store/blockList";

const AdminUserContent = () => {
    const { userData, admin_user, block_status } = useSelector((store) => store.user);
    const { totalPostOfUser } = useSelector((store) => store.post);
    const { total_donation } = useSelector((store) => store.donation);
    const { isBlocked } = useSelector((store) => store.blocklist);
    const [block, setBlock] = useState(userData?.status[0].status);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const handleContent = () => {
        navigate("/admin-dashboard");
    }
    window.scroll(0, 0);
    useEffect(() => {
        dispatch(fetchUserById(userId))
            .then(unwrapResult)
            .then((data) => {
                dispatch(loginAction.setUserData(data));
                dispatch(loginAction.setBlockStatus(data.status[0].status))
            })
        dispatch(postByUser({ userId: userId, pageNumber: 0 }))
            .then(unwrapResult)
            .then((data) => {
                dispatch(postAction.setTotalPostOfUser(data.totalElement))
            })
        dispatch(getTotalAmount(userId))
            .then(unwrapResult)
            .then((data) => {
                dispatch(donationAction.setDonationAmount(data));
            })
    }, [isBlocked]);
    const handleDeleteUser = () => {
        let c = confirm("Are you sure?")
        if (c) {
            dispatch(deleteUser(userId))
                .then(unwrapResult)
                .then((data) => {
                    console.log(data);
                    if (data.success == true) {
                        toast.success(data.message);
                        handleContent();
                    }
                    else {
                        toast.error(data.message);
                    }
                })
        }

    }
    const handleBlock = () => {
        dispatch(blockUser(userId))
            .then(unwrapResult)
            .then((data) => {
                if (data.success == true) {
                    toast.success(data.message)
                    dispatch(blockListAction.setBlockeStatus());
                    dispatch(loginAction.setBlockStatus("BLOCKED"));
                    setBlock("BLOCKED")
                }
            })
    }
    const handleUnBlock = () => {
        dispatch(unBlockUser(userId))
            .then(unwrapResult)
            .then((data) => {
                console.log(data);
                if (data.success == true) {
                    toast.success(data.message)
                    dispatch(blockListAction.setUnBlockeStatus());
                    dispatch(loginAction.setBlockStatus("UNBLOCKED"));
                    setBlock("UNBLOCKED")
                }
            })
    }
    
    let date=new Date(userData?.dob);
    let age=new Date().getFullYear()-date.getFullYear();
    return (
        <div className="admin_user_content_main_container">
            <div className='admin_user_content_container'>
                <div className="admin_user_content_details">
                    <div className="admin_user_content_dp">
                        <img src={BASE_URL + "/api/user/image/" + userData?.imageName} alt="" />
                    </div>
                    <div className="admin_user_content_name">
                        <h1>{userData?.fname + " " + userData?.lname}</h1>
                    </div>
                    <div className="admin_user_content_age">
                        <p>age <span>{age}</span></p>
                    </div>
                    <div className="admin_user_content_icons">
                        <Link> <FaInstagramSquare className="user_social_icon" /></Link>
                        <Link> <FaSquareFacebook className="user_social_icon" /></Link>
                        <Link> <IoLogoYoutube className="user_social_icon" /></Link>
                        <Link> <FaSquareXTwitter className="user_social_icon" /></Link>
                    </div>
                </div>
                <div className="admin_user_content_personal_info">
                    <div className="auc_personal_info_contact_container">
                        <h3>Contact Information</h3>
                        <div className="auc_personal_info_contact">
                            <div className="auc_personal_info_contact_email">
                                <label htmlFor="email">Email</label>
                                <p id="email">{userData?.email}</p>
                            </div>
                            <div className="auc_personal_info_contact_mobile">
                                <label htmlFor="mobile">Phone Number</label>
                                <p id="mobile">{userData?.mobile}</p>
                            </div>
                        </div>
                    </div>
                    <div className="auc_personal_info_personal_container">
                        <h3>Personal Information</h3>
                        <div className="auc_personal_info_personal">
                            <div className="auc_personal_info_contact_dob">
                                <label htmlFor="dob">Date Of Birth</label>
                                <p id="dob">{userData?.dob}</p>
                            </div>
                            <div className="auc_personal_info_contact_age">
                                <label htmlFor="age">Age</label>
                                <p id="dob">{age}</p>
                            </div>
                        </div>
                    </div>
                    <div className="auc_action_buttons">
                        <h3>Take Action On User</h3>
                        {admin_user?.roleName == "ADMIN_USER" &&
                            <div className="admin_user_content_buttons">
                                {block_status == "BLOCKED" ?
                                    <button onClick={handleUnBlock} id='admin_block_button'>unblock</button> :
                                    <button onClick={handleBlock} id='admin_block_button'>block</button>
                                }
                                <button onClick={handleDeleteUser} id='admin_delete_button'>delete</button>
                                <button onClick={handleContent} id='admin_back_button'>Back</button>
                            </div>}
                    </div>
                </div>

            </div>
            <div className="admin_user_content_count">
                <div className="admin_user_content_count_article">
                    <label htmlFor="article">Total Article Post</label>
                    <p id="article">{totalPostOfUser}</p>
                </div>
                <div className="admin_user_content_count_donate">
                    <label htmlFor="donate">Total Donate amount</label>
                    <p id="donate">&#8377; {total_donation}</p>
                </div>
            </div>
        </div>
    )
}

export default AdminUserContent