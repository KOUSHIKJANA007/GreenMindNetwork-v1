import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import NgoDetails from '../components/NgoDetails';
import NgoEvents from '../components/NgoEvents';
import NgoPhotos from '../components/NgoPhotos';
import { useDispatch, useSelector } from 'react-redux';
import { getNgoByUser, getSingleNgo, ngoAction } from '../store/ngoDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import LoadingBar from 'react-top-loading-bar';
import { validationAction } from '../store/OtpValidation';
import { BASE_URL } from '../store/helper';
import { IoIosCreate } from "react-icons/io";
import { toast } from 'react-toastify';
import { eventAction, getEventByNgo } from '../store/eventDetails';

const UserNgoDashboard = () => {

    const { userNgo, loading } = useSelector((store) => store.ngo);
    const { progress } = useSelector((store) => store.validation);
    const { events, isDelete } = useSelector((store) => store.event);
    const [toggleMenu, setToggleMenu] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId, ngoId } = useParams();
    const handleToggle = (data) => {
        setToggleMenu(data);
    }
    useEffect(() => {
        dispatch(validationAction.setProgress(50));
        dispatch(getNgoByUser(userId))
            .then(unwrapResult)
            .then((data) => {
                if (data?.user?.id == userId) {
                    dispatch(ngoAction.setUserNgoData(data))
                }
                dispatch(validationAction.setProgress(100));
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    useEffect(() => {
        window.scroll(0, 0);
        dispatch(getEventByNgo(ngoId))
            .then(unwrapResult)
            .then((data) => {
                if (data.length == 0) {
                    dispatch(eventAction.setEvent(null));
                    return;
                }
                else {
                    dispatch(eventAction.setEvent(data));
                }

            })
            .catch((err) => {
                toast.error(err)
            })
            dispatch(eventAction.setDeleteDone())
    }, [isDelete])
    return (
        <>
            {loading && <LoadingBar color="#78be20" progress={progress} />}
            <div className="user_ngo_dash_main_container">
                <div className="user_ngo_dash_container">
                    <div className="user_ngo_dash_logo">
                        <img src={BASE_URL + `/api/ngo/image/${userNgo?.logo}`} alt="" />
                    </div>
                    <div className="user_ngo_dash_details">
                        <div className="user_ngo_dash_details_name">  <h1>{userNgo?.name} </h1></div>
                        <div className="user_ngo_dash_details_contact"><h3><span><MdOutlineEmail /></span>{userNgo?.email}</h3>
                            <h3><span><HiMiniDevicePhoneMobile /></span>{userNgo?.mobile}</h3>
                            <h3><span><GrMapLocation /></span>{userNgo?.address}</h3></div>

                    </div>
                </div>
                <div className="user_ngo_dash_nav_options">
                    <div className="user_ngo_dash_nav_options_events">
                        <Link className={toggleMenu == '1' ? `user_ngo_dash_nav_options_property active` : `user_ngo_dash_nav_options_property`} onClick={() => { handleToggle(1) }}>events</Link>
                    </div>
                    <div className="user_ngo_dash_nav_options_about">
                        <Link className={toggleMenu == '2' ? `user_ngo_dash_nav_options_property active` : `user_ngo_dash_nav_options_property`} onClick={() => { handleToggle(2) }}>about</Link>
                    </div>

                    <div className="user_ngo_dash_nav_options_photos">
                        <Link className={toggleMenu == '3' ? `user_ngo_dash_nav_options_property active` : `user_ngo_dash_nav_options_property`} onClick={() => { handleToggle(3) }}>photos</Link>
                    </div>
                </div>
                <div className="user_ngo_dash_content">
                    {toggleMenu == '1' &&
                        events?.map((item) =>
                            <NgoEvents key={item.id} ngo={userNgo} event={item} />
                        )}
                    {
                        toggleMenu == '1' &&
                        events == null &&
                        <NgoEvents ngo={userNgo} event={null} />
                    }
                    {toggleMenu == '2' && <NgoDetails ngo={userNgo} />}
                    {toggleMenu == '3' && <NgoPhotos userNgo={userNgo} />}
                </div>
                <div className="user_ngo_dash_create_event">
                    <button type='submit'><Link to={`/create-event/${ngoId}`}><IoIosCreate className='event_create_icon' />create event</Link></button>
                </div>
            </div>
        </>
    )
}

export default UserNgoDashboard