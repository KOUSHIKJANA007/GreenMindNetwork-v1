import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LoginBox from './LoginBox'
import ProfileBox from './ProfileBox'
import { FaBars } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { profileAction } from '../store/toggleProfileSlice'

const Header = () => {
  const toggleProfile = useSelector((store) => store.toggleProfile);
  const dispatch = useDispatch();
  const [dropDown, setDropDown] = useState(false);
  const handleDropDownMenuOpen = () => {
    setDropDown(true);
  }
  const handleDropDownMenuClose = () => {
    setDropDown(false);
  }
  return (
    <>
      <header>

        <div className="logo_box">
          <Link to="#"><img src="image/logo.png" alt="" /></Link>
        </div>
        <nav className="nav_bar">
          <Link to="#">about</Link>
          <Link to="#" >awarness camp</Link>
          <Link to="#" >blog</Link>
          <Link to="#" >contact us</Link>
          <Link to="#" >support us</Link>
        </nav>
        {
          toggleProfile.Login
            ?
            <ProfileBox />
            :
            <LoginBox />
        }
        <div className="donation">donation</div>
        <div className="dropdown_menu">

        </div>
        <div className="troggle_btn">

          {dropDown
            ?
            <TiDeleteOutline onClick={handleDropDownMenuClose} />
            :
            <FaBars onClick={handleDropDownMenuOpen} />
          }
        </div>
        {toggleProfile.Login
          ?
          <div className="dropdown_menu">
            <Link to="">Koushik Jana</Link>
            <Link to="#">about</Link>
            <Link to="#" >awarness camp</Link>
            <Link to="#" >blog</Link>
            <Link to="#" >contact us</Link>
            <Link to="#" >support us</Link>
            <div className="drop_donation">donation</div>

          </div>
          :
          <div className={dropDown ? "dropdown_menu open" : "dropdown_menu"}>
            <Link to="#">about</Link>
            <Link to="#" >awarness camp</Link>
            <Link to="#" >blog</Link>
            <Link to="#" >contact us</Link>
            <Link to="#" >support us</Link>
            <Link to="">sign up</Link>
            <Link to="">login</Link>
            <div className="drop_donation">donation</div>
          </div>}
      </header>
    </>
  )
}

export default Header