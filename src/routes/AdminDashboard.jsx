import React, { useEffect } from 'react'
import AdminUserDetails from '../components/AdminUserDetails'
import AdminNgoDetails from '../components/AdminNgoDetails';
import { useDispatch, useSelector } from 'react-redux';
import { adminAction } from '../store/adminFunctions';
import { fetchAllUser, loginAction } from '../store/userDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { getTotalNgo, ngoAction } from '../store/ngoDetails';
import { getTotalSocialPost, socialPostAction } from '../store/socialImageDetails';
import { getTotalPost, postAction } from '../store/postDetails';
import { eventAction, getTotalEvent } from '../store/eventDetails';

const AdminDashboard = () => {
    const { toggleNav } = useSelector((store) => store.admin);
    const { isDelete, allUsers } = useSelector((store) => store.user);
    const { isBlocked } = useSelector((store) => store.blocklist);
    const { total_ngo } = useSelector((store) => store.ngo);
    const { total_post } = useSelector((store) => store.post);
    const { total_socialPost } = useSelector((store) => store.socialPost);
    const { total_event } = useSelector((store) => store.event);
    const dispatch = useDispatch();
    useEffect(() => {
        // window.scroll(0, 0)
        dispatch(fetchAllUser())
            .then(unwrapResult)
            .then((data) => {
                console.log(data);
                dispatch(loginAction.setALlUser(data));
            })
        dispatch(loginAction.setDeleteEnd());
        console.log("fetched");
        dispatch(getTotalNgo())
        .then(unwrapResult)
        .then((data)=>{
            if(data?.status!='400'){
                dispatch(ngoAction.setTotalNgo(data))
            }
        })
        dispatch(getTotalSocialPost())
        .then(unwrapResult)
        .then((data)=>{
            if (data?.status != '400') {  dispatch(socialPostAction.setTotalSocialPost(data))}
          
        })
        dispatch(getTotalPost())
        .then(unwrapResult)
        .then((data)=>{
            if (data?.status != '400') { dispatch(postAction.setTotalPost(data))}
           
        })
        dispatch(getTotalEvent())
        .then(unwrapResult)
        .then((data)=>{
            if (data?.status != '400') { dispatch(eventAction.setTotalEvent(data))}
           
        })
    }, [isDelete, isBlocked])
    return (
        <>
            <div className="admin_dash_main_container">

                <div className="admin_dash_content">
                    <div className="admin_dash_top_content">
                        <div className="admin_dash_user_count">
                            <h1> total user</h1>
                            <h2>{allUsers?.length}</h2>
                        </div>
                        <div className="admin_dash_ngo_count">
                            <h1>total ngo</h1>
                            <h2>{total_ngo}</h2>
                        </div>
                        <div className="admin_dash_post_count">
                            <h1>total post</h1>
                            <h2>{total_post}</h2>
                        </div>
                        <div className="admin_dash_event_count">
                            <h1>total event</h1>
                            <h2>{total_event}</h2>
                        </div>
                        <div className="admin_dash_social_post_count">
                            <h1>Social Post</h1>
                            <h2>{total_socialPost}</h2>
                        </div>
                    </div>
                    <div className="admin_dash_nav_options">
                        <div className={toggleNav == 1 ? "admin_dash_user active" : "admin_dash_user"} onClick={() => { dispatch(adminAction.setUserToggleNav()) }}>users details</div>
                        <div className={toggleNav == 2 ? "admin_dash_ngo active" : "admin_dash_ngo"} onClick={() => { dispatch(adminAction.setNgoToggleNav()) }}>ngo details</div>
                    </div>
                    {toggleNav == '1' && <AdminUserDetails />}
                    {toggleNav == '2' && <AdminNgoDetails />}

                </div>
            </div>
        </>
    )
}

export default AdminDashboard