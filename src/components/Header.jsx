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
  const [toggleNav, setToggleNav] = useState('')
  const handleDropDownMenuOpen = () => {
    setDropDown(!dropDown);
  }
  const handleDropDownMenuClose = () => {
    setDropDown(false);
  }
  const handleToggle = (data) => {
    setToggleNav(data);
  }

  return (
    <>
      <header>
        <div className="logo_box">

          {
            isLogin
              ?
              <Link to="/userhome" onClick={() => handleToggle(0)} ><img src="/image/logo.png" alt="logo" /></Link>
              :
              <Link to="/" onClick={() => handleToggle(0)} ><img src="/image/logo.png" alt="" /></Link>
          }


        </div>
        <nav className="nav_bar">
          <Link className={toggleNav == '1' ? "nav_about active_nav" : "nav_about"} onClick={() => handleToggle(1)} to="#">about</Link>
          <Link className={toggleNav == '2' ? "nav_awc active_nav" : "nav_awc"} onClick={() => handleToggle(2)} to="#" >awareness camp</Link>
          <Link className={toggleNav == '3' ? "nav_article active_nav" : "nav_article"} onClick={() => handleToggle(3)} to="/articles" >Articles</Link>
          <Link className={toggleNav == '4' ? "nav_contact active_nav" : "nav_contact"} onClick={() => handleToggle(4)} to="/contact-us" >contact us</Link>
          <Link className={toggleNav == '5' ? "nav_ngo active_nav" : "nav_ngo"} onClick={() => handleToggle(5)} to="/ngo" >NGO's</Link>
        </nav>


        {
          isLogin
            ?
            <ProfileBox handleToggle={handleToggle} users={users} />
            :
            <LoginBox handleToggle={handleToggle} toggleNav={toggleNav} />
        }


        <div className="donation"><Link to="/donation-dashboard" onClick={() => {
          handleDropDownMenuClose()
          handleToggle(0)
        }}>donation</Link></div>
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
              <Link onClick={handleDropDownMenuClose} to="/contact-us" className='drop_options'>contact us</Link>
              <Link onClick={handleDropDownMenuClose} to="/ngo" className='drop_options'>NGO's</Link>
              <div className="drop_donation"><Link to="/donation-dashboard" onClick={handleDropDownMenuClose}>donation</Link></div>
            </div>
            :
            <div className={dropDown ? "dropdown_menu open" : "dropdown_menu"}>
              <Link onClick={handleDropDownMenuClose} to="#" className='drop_options'>about</Link>
              <Link onClick={handleDropDownMenuClose} to="#" className='drop_options'>awareness camp</Link>
              <Link onClick={handleDropDownMenuClose} to="/articles" className='drop_options'>Articles</Link>
              <Link onClick={handleDropDownMenuClose} to="/contact-us" className='drop_options'>contact us</Link>
              <Link onClick={handleDropDownMenuClose} to="/ngo" className='drop_options'>NGO's</Link>
              <Link onClick={handleDropDownMenuClose} to="/email-input" className='drop_options'>sign up</Link>
              <Link onClick={handleDropDownMenuClose} to="/signin" className='drop_options'>login</Link>
              <div className="drop_donation"><Link to="/donation-dashboard" onClick={handleDropDownMenuClose}>donation</Link></div>
            </div>
        }
      </header>
    </>
  )
}

export default Header