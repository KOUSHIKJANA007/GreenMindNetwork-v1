import React from 'react'
import { useSelector } from 'react-redux';

const ProtectNgo = ({ Component1, Component2 }) => {
    const { isLogin } = useSelector((store) => store.user);
  return (
    <>
        { isLogin ? <Component2/> : <Component1/>}
    </>
  )
}

export default ProtectNgo