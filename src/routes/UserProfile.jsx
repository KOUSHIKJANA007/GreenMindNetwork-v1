import React, { useEffect } from 'react';
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../store/helper';
import { getNgoByUser, ngoAction } from '../store/ngoDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import LoadingBar from 'react-top-loading-bar';
import { validationAction } from '../store/OtpValidation';
import { toast } from 'react-toastify';
import { loginAction } from '../store/userDetails';


const UserProfile = () => {
  document.title = "My Profile"
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, admin_user } = useSelector((store) => store.user);
  const { userNgo, loading } = useSelector((store) => store.ngo);
  const { progress } = useSelector((store) => store.validation);
  useEffect(() => {
    dispatch(validationAction.setProgress(50))
    dispatch(getNgoByUser(users?.id))
      .then(unwrapResult)
      .then((data) => {
        dispatch(ngoAction.setUserNgoData(data));
      })
    dispatch(validationAction.setProgress(100));
  }, []);
  const handleLogout = () => {
    dispatch(validationAction.setProgress(50));
    dispatch(loginAction.doLogout());
    toast.success("Logout successfull");
    navigate("/signin");
    dispatch(validationAction.setProgress(100));
  }
  return (
    <>
      {loading && <LoadingBar progress={progress} color="#78be20" />}
      <div className="profile_main_container">
        <div className="profile_container">
          <div className="profile_banner">
            <div className="profile_banner_image">
              <img src="image/banner.jpg" alt="" />
            </div>
            <div className="profile_user_details_container">
              <div className="profile_user_image">
                <img src={BASE_URL + `/api/user/image/${users.imageName}`} alt="" />
              </div>
              <div className="user_information">
                <div className="profile_user_details_name">
                  <h1>{users.fname + " " + users.lname}</h1>
                </div>
                <div className="profile_user_details_social">
                  <Link className={users?.instagramLink ? '' :'disable-link'} to={`https://${users?.instagramLink}` } target="_blank"><FaInstagramSquare className='social_icons' /></Link>
                  <Link className={users?.facebookLink ? '' : 'disable-link'} to={`https://${users.facebookLink}`} target="_blank"><FaSquareFacebook className='social_icons' /></Link>
                  <Link className={users?.youtubeLink ? '' : 'disable-link'} to={`https://${users.youtubeLink}`} target="_blank"><IoLogoYoutube className='social_icons' /></Link>
                  <Link className={users?.twitterLink ? '' : 'disable-link'} to={`https://${users.twitterLink}`} target="_blank"><FaSquareXTwitter className='social_icons' /></Link>
                </div>
                <div className="profile_nav_options">
                  <button className='profile_nav_button'><Link to="/userposts">my posts</Link></button>
                  <button className='profile_nav_button'><Link to={`/ngo-content/${users?.id}/${userNgo?.id}`}>my NGO</Link></button>
                  <button className='profile_nav_button' ><Link to="/editprofile">edit profile</Link></button>
                 
                  {
                    admin_user?.roleName == "ADMIN_USER" ?
                    <button className='profile_nav_button'><Link to="/admin-dashboard">dashboard</Link></button>
                    :
                      <button className='profile_nav_button' onClick={handleLogout} ><Link>logout</Link></button>
                  }
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile