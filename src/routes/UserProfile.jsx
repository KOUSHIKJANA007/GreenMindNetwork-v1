import React from 'react';
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../store/helper';


const UserProfile = () => {
  document.title="My Profile"
  const { users } = useSelector((store) => store.user);
  return (
    <>
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
                  <Link to={users.instagramLink ? `https://${users.instagramLink}` : `#`} target="_blank"><FaInstagramSquare className='social_icons' /></Link>
                  <Link to={users.facebookLink ? `https://${users.facebookLink}` : `#`} target="_blank"><FaSquareFacebook className='social_icons' /></Link>
                  <Link to={users.youtubeLink ? `https://${users.youtubeLink}` : `#`} target="_blank"><IoLogoYoutube className='social_icons' /></Link>
                  <Link to={users.twitterLink ? `https://${users.twitterLink}` : `#`} target="_blank"><FaSquareXTwitter className='social_icons' /></Link>
                </div>
                <div className="profile_nav_options">
                  <button className='profile_nav_button'><Link to="/userposts">my posts</Link></button>
                  <button className='profile_nav_button'><Link>my NGO</Link></button>
                  <button className='profile_nav_button' ><Link to="/editprofile">edit profile</Link></button>
                  <button className='profile_nav_button'><Link to="">my posts</Link></button>
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