import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginBox from './LoginBox'
import ProfileBox from './ProfileBox'
import { FaBars } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { useSelector } from 'react-redux';
const Header = () => {
  const [dropDown, setDropDown] = useState();
  const { users, isLogin } = useSelector((store) => store.user);
  const handleDropDownMenuOpen = () => {
    setDropDown(!dropDown);
  }
  const handleDropDownMenuClose = () => {
    setDropDown(false);
  }

  return (
    <>
      <header>
        <div className="logo_box">

          {
            isLogin
              ?
              <Link to="/userhome"><img src="/public/image/logo.png" alt="logo" /></Link>
              :
              <Link to="/"><img src="image/logo.png" alt="" /></Link>
          }


        </div>
        <nav className="nav_bar">
          <Link to="#">about</Link>
          <Link to="#" >awareness camp</Link>
          <Link to="/articles" >Articles</Link>
          <Link to="#" >contact us</Link>
          <Link to="/ngo" >NGO's</Link>
        </nav>


        {
          isLogin
            ?
            <ProfileBox users={users} />
            :
            <LoginBox />
        }


        <div className="donation"><Link to="/donation" onClick={handleDropDownMenuClose}>donation</Link></div>
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
              <Link onClick={handleDropDownMenuClose} to="/" className='drop_options'>home</Link>
              <Link onClick={handleDropDownMenuClose} to="#" className='drop_options'>about</Link>
              <Link onClick={handleDropDownMenuClose} to="#" className='drop_options'>awareness camp</Link>
              <Link onClick={handleDropDownMenuClose} to="/articles" className='drop_options'>articles</Link>
              <Link onClick={handleDropDownMenuClose} to="#" className='drop_options'>contact us</Link>
              <Link onClick={handleDropDownMenuClose} to="/ngo" className='drop_options'>NGO's</Link>
              <div className="drop_donation"><Link to="/donation" onClick={handleDropDownMenuClose}>donation</Link></div>
            </div>
            :
            <div className={dropDown ? "dropdown_menu open" : "dropdown_menu"}>
              <Link onClick={handleDropDownMenuClose} to="#" className='drop_options'>about</Link>
              <Link onClick={handleDropDownMenuClose} to="#" className='drop_options'>awareness camp</Link>
              <Link onClick={handleDropDownMenuClose} to="/articles" className='drop_options'>Articles</Link>
              <Link onClick={handleDropDownMenuClose} to="#" className='drop_options'>contact us</Link>
              <Link onClick={handleDropDownMenuClose} to="/ngo" className='drop_options'>NGO's</Link>
              <Link onClick={handleDropDownMenuClose} to="/email-input" className='drop_options'>sign up</Link>
              <Link onClick={handleDropDownMenuClose} to="/signin" className='drop_options'>login</Link>
              <div className="drop_donation"><Link to="/donation" onClick={handleDropDownMenuClose}>donation</Link></div>
            </div>
        }
      </header>
    </>
  )
}

export default Header