import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LoginBox from './LoginBox'
import ProfileBox from './ProfileBox'
import { FaBars } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { profileAction } from '../store/toggleProfileSlice'

const Header = () => {
  const toggleProfile = useSelector((store) => store.toggleProfile);
  const [dropDown, setDropDown] = useState();
  const mobileMenuRef = useRef();

  const closeOpenMenus = useCallback(
    (e) => {
      if (
        mobileMenuRef.current &&
        dropDown &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setDropDown(false);
      }
    },
    [dropDown]
  );

  useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);

  }, [closeOpenMenus]);

  const handleDropDownMenuOpen = () => {
    setDropDown(!dropDown);
  }
  const handleDropDownMenuClose = () => {
    setDropDown(false);
  }
  const handleList = () => {
    setDropDown(false);
  }
  return (
    <>
      <header>
        <div className="logo_box">
          <Link to="/"><img src="image/logo.png" alt="" /></Link>
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


        <div className="donation">donate</div>
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
          <div ref={mobileMenuRef} className={dropDown ? "dropdown_menu open" : "dropdown_menu"}>
            <Link onClick={handleList} to="#">about</Link>
            <Link onClick={handleList} to="#" >awarness camp</Link>
            <Link onClick={handleList} to="#" >blog</Link>
            <Link onClick={handleList} to="#" >contact us</Link>
            <Link onClick={handleList} to="#" >support us</Link>
            <div className="drop_donation">donate</div>

          </div>
          :
          <div ref={mobileMenuRef} className={dropDown ? "dropdown_menu open" : "dropdown_menu"}>
            <Link onClick={handleList} to="#">about</Link>
            <Link onClick={handleList} to="#" >awarness camp</Link>
            <Link onClick={handleList} to="#" >blog</Link>
            <Link onClick={handleList} to="#" >contact us</Link>
            <Link onClick={handleList} to="#" >support us</Link>
            <Link onClick={handleList} to="/signup">sign up</Link>
            <Link onClick={handleList} to="/signin">login</Link>
            <div className="drop_donation">donate</div>
          </div>}
      </header>
    </>
  )
}

export default Header