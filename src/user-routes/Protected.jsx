import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Protected = ({ Component }) => {
  const navigate = useNavigate()
 useEffect(()=>{
   if (localStorage.getItem("data") == null) {
     navigate("/signin")
   }
 },[])

  return (
    <>
      {localStorage.getItem("data") != null &&
        <Component />
      }
    </>
  )
}

export default Protected