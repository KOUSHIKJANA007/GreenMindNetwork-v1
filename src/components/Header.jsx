import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import LoginBox from './LoginBox'
import ProfileBox from './ProfileBox'
import { FaBars } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { getCurrentUserDetails, isLoggedIn } from '../auth';
const Header = () => {
  const [dropDown, setDropDown] = useState();
  const [login,setLogin]=useState(false);
  const [user, setUser] = useState(undefined);
  useEffect(()=>{
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetails());
  },[login],[user])
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
          <Link to="/articles" >Articles</Link>
          <Link to="#" >contact us</Link>
          <Link to="#" >support us</Link>
        </nav>


        {
         login
            ?
            <ProfileBox user={user}/>
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
        {login
          ?
          <div ref={mobileMenuRef} className={dropDown ? "dropdown_menu open" : "dropdown_menu"}>
            <Link onClick={handleList} to="/">home</Link>
            <Link onClick={handleList} to="#">about</Link>
            <Link onClick={handleList} to="#" >awarness camp</Link>
            <Link onClick={handleList} to="/articles" >articles</Link>
            <Link onClick={handleList} to="#" >contact us</Link>
            <Link onClick={handleList} to="#" >support us</Link>
            <div className="drop_donation">donate</div>

          </div>
          :
          <div ref={mobileMenuRef} className={dropDown ? "dropdown_menu open" : "dropdown_menu"}>
            <Link onClick={handleList} to="#">about</Link>
            <Link onClick={handleList} to="#" >awarness camp</Link>
            <Link onClick={handleList} to="/articles" >Articles</Link>
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