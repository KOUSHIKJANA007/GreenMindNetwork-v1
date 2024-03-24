import React from 'react'
import { Link } from 'react-router-dom'

const LoginBox = ({ handleToggle, toggleNav }) => {
  return (
    <>
      <div className="login_box">
        <Link className={toggleNav == '6' ? "nav_signup active_nav" : 'nav_signup'} onClick={() => handleToggle(6)} to="/email-input">sign up</Link>
        <Link className={toggleNav == '7' ? "nav_login active_nav" : 'nav_login'} onClick={() => handleToggle(7)} to="/signin">login</Link>
      </div>
    </>
  )
}

export default LoginBox