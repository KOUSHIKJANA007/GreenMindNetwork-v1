import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminUserDetails from '../components/AdminUserDetails'
import AdminNgoDetails from '../components/AdminNgoDetails';
import { useDispatch, useSelector } from 'react-redux';
import { adminAction } from '../store/adminFunctions';
import { fetchAllUser, loginAction } from '../store/userDetails';
import { unwrapResult } from '@reduxjs/toolkit';

const AdminDashboard = () => {
    const { toggleNav } = useSelector((store) => store.admin);
    const dispatch = useDispatch();
   useEffect(() => {
        window.scroll(0, 0)
        dispatch(fetchAllUser())
            .then(unwrapResult)
            .then((data) => {
                console.log(data);
                dispatch(loginAction.setALlUser(data));
            })
    },[])
    return (
        <>
            <div className="admin_dash_main_container">

                <div className="admin_dash_content">
                    <div className="admin_dash_top_content">
                        <div className="admin_dash_user_count">
                            <h1> total user</h1>
                            <h2>100</h2>
                        </div>
                        <div className="admin_dash_ngo_count">
                            <h1>total ngo</h1>
                            <h2>100</h2>
                        </div>
                        <div className="admin_dash_post_count">
                            <h1>total post</h1>
                            <h2>100</h2>
                        </div>
                        <div className="admin_dash_event_count">
                            <h1>total event</h1>
                            <h2>100</h2>
                        </div>
                        <div className="admin_dash_social_post_count">
                            <h1>Social Post</h1>
                            <h2>100</h2>
                        </div>
                    </div>
                    <div className="admin_dash_nav_options">
                        <div className="admin_dash_user" onClick={() => { dispatch(adminAction.setUserToggleNav())}}>users details</div>
                        <div className="admin_dash_ngo" onClick={() => { dispatch(adminAction.setNgoToggleNav()) }}>ngo details</div>
                    </div>
                    {toggleNav == '1' && <AdminUserDetails />}
                    {toggleNav == '2' && <AdminNgoDetails />}

                </div>
            </div>
        </>
    )
}

export default AdminDashboard