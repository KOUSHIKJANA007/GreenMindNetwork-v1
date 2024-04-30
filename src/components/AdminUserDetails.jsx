import React, { useEffect, useRef, useState } from 'react'
import AdminUserItem from './AdminUserItem'
import {useDispatch, useSelector } from 'react-redux';
import { fetchUserByEmail, loginAction } from '../store/userDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const AdminUserDetails = () => {
    const { allUsers, userData, toggle_search } = useSelector((store) => store.user);
    const searchEmail=useRef();
    const dispatch=useDispatch();
    const [toggle, setToggle] = useState(toggle_search);
    useEffect(()=>{
        setToggle(toggle_search);
    },[toggle_search])
    const handleSearchToggle = () => {
        dispatch(loginAction.setToggleSearch(false))
    }
    const handleSearch=()=>{
       const email=searchEmail.current.value.trim();
       if(email.trim()==""){
        toast.error("Enter value");
        return;
       }
    dispatch(fetchUserByEmail(email))
    .then(unwrapResult)
    .then((data)=>{
       if(data?.id != null){
           dispatch(loginAction.setUserData(data));
       }
       else{
        dispatch(loginAction.setUserData(null))
        toast.error(data.message)
       }
    })
   }
    return (
        <div className='admin_user_details_main_container'>
          <div className='admin_user_details_container'>
               {!toggle && <div className="admin_user_details_container_back">
                    <button onClick={()=>{dispatch(loginAction.setToggleSearch(true))}}>Back</button>
                </div>}
                <div className="admin_user_details_container_search">
                    <input ref={searchEmail} type="text" placeholder='Search By Email....' />
                    <button onClick={()=>{
                        handleSearch()
                        handleSearchToggle()
                    }}>search</button>
                </div>
            </div>
            {toggle && allUsers?.map((item)=>
                <AdminUserItem key={item?.id}  users={item} />
            )}
            {
                !toggle && userData!=null && <><AdminUserItem users={userData}/></>
            }
            {
                userData == null && allUsers?.length=='0' && <div className='admin_user_details_nouserfound'>No user found</div>
            }
        </div>
    )
}

export default AdminUserDetails