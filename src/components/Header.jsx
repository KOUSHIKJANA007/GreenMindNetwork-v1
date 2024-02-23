import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoginBox from './LoginBox'
import ProfileBox from './ProfileBox'
import { FaBars } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
const Header = () => {
  const [dropDown, setDropDown] = useState();
  const { users, isLogin } = useSelector((store) => store.user);
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

          {
            isLogin
              ?
              <Link to="/userhome"><img src="image/logo.png" alt="" /></Link>
              :
              <Link to="/"><img src="image/logo.png" alt="" /></Link>
          }


        </div>
        <nav className="nav_bar">
          <Link to="#">about</Link>
          <Link to="#" >awarness camp</Link>
          <Link to="/articles" >Articles</Link>
          <Link to="#" >contact us</Link>
          <Link to="#" >support us</Link>
        </nav>








        {
          isLogin
            ?
            <ProfileBox users={users} />
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


        {
          isLogin

            ?
            <div className={dropDown ? "dropdown_menu open" : "dropdown_menu"}>
              <Link onClick={handleList} to="/">home</Link>
              <Link onClick={handleList} to="#">about</Link>
              <Link onClick={handleList} to="#" >awarness camp</Link>
              <Link onClick={handleList} to="/articles" >articles</Link>
              <Link onClick={handleList} to="#" >contact us</Link>
              <Link onClick={handleList} to="#" >support us</Link>
              <div className="drop_donation">donate</div>
            </div>
            :
            <div className={dropDown ? "dropdown_menu open" : "dropdown_menu"}>
              <Link onClick={handleList} to="#">about</Link>
              <Link onClick={handleList} to="#" >awarness camp</Link>
              <Link onClick={handleList} to="/articles" >Articles</Link>
              <Link onClick={handleList} to="#" >contact us</Link>
              <Link onClick={handleList} to="#" >support us</Link>
              <Link onClick={handleList} to="/signup">sign up</Link>
              <Link onClick={handleList} to="/signin">login</Link>
              <div className="drop_donation">donate</div>
            </div>
        }
      </header>
    </>
  )
}

export default Header