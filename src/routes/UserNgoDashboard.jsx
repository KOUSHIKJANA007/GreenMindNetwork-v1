import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import NgoDetails from '../components/NgoDetails';
import NgoEvents from '../components/NgoEvents';
import NgoPhotos from '../components/NgoPhotos';
import { useDispatch, useSelector } from 'react-redux';
import { getNgoByUser, ngoAction } from '../store/ngoDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import LoadingBar from 'react-top-loading-bar';
import { validationAction } from '../store/OtpValidation';
import { BASE_URL } from '../store/helper';
import { IoIosCreate } from "react-icons/io";
import { toast } from 'react-toastify';

const UserNgoDashboard = () => {
    window.scroll(0,0);
    const { userNgo,loading } = useSelector((store) => store.ngo);
    const { progress } = useSelector((store) => store.validation);
    const [toggleMenu, setToggleMenu] = useState(1);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {userId}=useParams();
    const handleToggle=(data)=>{
        setToggleMenu(data);
    }
    useEffect(()=>{
        dispatch(validationAction.setProgress(50));
        dispatch(getNgoByUser(userId))
        .then(unwrapResult)
        .then((data)=>{
            if(data?.user?.id == userId){
                dispatch(ngoAction.setUserNgoData(data))
            }
            else{
                toast.error("You don't have any NGO please create first");
                navigate("/ngo");
                
            }
            dispatch(validationAction.setProgress(100));
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    return (
        <>
            {loading && <LoadingBar color="#78be20" progress={progress} />}
            <div className="user_ngo_dash_main_container">
                <div className="user_ngo_dash_container">
                    <div className="user_ngo_dash_logo">
                        <img src={BASE_URL+`/api/ngo/image/${userNgo?.logo}`} alt="" />
                    </div>
                    <div className="user_ngo_dash_details">
                        <div className="user_ngo_dash_details_name">  <h1>{userNgo?.name} </h1></div>
                        <div className="user_ngo_dash_details_contact"><h3><span><MdOutlineEmail /></span>email</h3>
                            <h3><span><HiMiniDevicePhoneMobile /></span>{userNgo?.mobile}</h3>
                            <h3><span><TbAddressBook /></span>{userNgo?.address}</h3></div>
                        
                    </div>
                </div>
                <div className="user_ngo_dash_nav_options">
                    <div className="user_ngo_dash_nav_options_events">
                        <Link className={toggleMenu == '1' ? `user_ngo_dash_nav_options_property active` : `user_ngo_dash_nav_options_property`} onClick={() => { handleToggle(1) }}>events</Link>
                    </div>
                    <div className="user_ngo_dash_nav_options_about">
                        <Link className={toggleMenu == '2' ? `user_ngo_dash_nav_options_property active` :`user_ngo_dash_nav_options_property`} onClick={()=>{handleToggle(2)}}>about</Link>
                    </div>
                    
                    <div className="user_ngo_dash_nav_options_photos">
                        <Link className={toggleMenu == '3' ? `user_ngo_dash_nav_options_property active` :`user_ngo_dash_nav_options_property`} onClick={() => { handleToggle(3) }}>photos</Link>
                    </div>
                </div>
                <div className="user_ngo_dash_content">
                    {toggleMenu=='1' && <NgoEvents/>}
                    {toggleMenu=='1' && <NgoEvents/>}
                    {toggleMenu=='1' && <NgoEvents/>}
                    {toggleMenu=='1' && <NgoEvents/>}
                    {toggleMenu=='1' && <NgoEvents/>}
                    {toggleMenu=='1' && <NgoEvents/>}
                    {toggleMenu=='1' && <NgoEvents/>}
                    {toggleMenu=='2' && <NgoDetails/>}
                    {toggleMenu=='3' && <NgoPhotos/>}
                </div>
                <div className="user_ngo_dash_create_event">
                    <button type='submit'><Link><IoIosCreate className='event_create_icon'/>create event</Link></button>
                </div>
            </div>
        </>
    )
}

export default UserNgoDashboard