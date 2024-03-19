import React, { useEffect, useState } from 'react'
import NgoEvents from '../components/NgoEvents';
import { useDispatch, useSelector } from 'react-redux';
import { eventAction, getEventByNgo } from '../store/eventDetails';
import { getSingleNgo, ngoAction } from '../store/ngoDetails';
import { Link, useParams } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { BASE_URL } from '../store/helper';
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { IoIosCreate } from 'react-icons/io';
import NgoDetails from '../components/NgoDetails';
import NgoPhotos from '../components/NgoPhotos';

const OtherUserNgoView = () => {
    const [toggleMenu, setToggleMenu] = useState(1);
    const { users } = useSelector((store) => store.user);
    const dispatch=useDispatch();
    const {ngoId } = useParams();
    const { progress } = useSelector((store) => store.validation);
    const { events } = useSelector((store) => store.event);
    const { singleNgo } = useSelector((store) => store.ngo);
    const handleToggle = (data) => {
        setToggleMenu(data);
    }
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
    }, [])
    useEffect(()=>{
        dispatch(getSingleNgo(ngoId))
        .then(unwrapResult)
        .then((data)=>{
            console.log({data});
            dispatch(ngoAction.setSingleNgoData(data))
        })
    },[])
  return (
    <>
          <div className="user_ngo_dash_main_container">
              <div className="user_ngo_dash_container">
                  <div className="user_ngo_dash_logo">
                      <img src={BASE_URL + `/api/ngo/image/${singleNgo?.logo}`} alt="" />
                  </div>
                  <div className="user_ngo_dash_details">
                      <div className="user_ngo_dash_details_name">  <h1>{singleNgo?.name} </h1></div>
                      <div className="user_ngo_dash_details_contact"><h3><span><MdOutlineEmail /></span>email</h3>
                          <h3><span><HiMiniDevicePhoneMobile /></span>{singleNgo?.mobile}</h3>
                          <h3><span><TbAddressBook /></span>{singleNgo?.address}</h3></div>
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
                          <NgoEvents key={item.id} event={item} />
                      )}
                  {
                      toggleMenu == '1' &&
                      events == null &&
                      <NgoEvents event={null} />
                  }
                  {toggleMenu == '2' && <NgoDetails ngo={singleNgo}/>}
                  {toggleMenu == '3' && <NgoPhotos userNgo={singleNgo}/>}
              </div>
              { singleNgo?.user?.id==users?.id &&
              <div className="user_ngo_dash_create_event">
                  <button type='submit'><Link><IoIosCreate className='event_create_icon' />create event</Link></button>
              </div>}
          </div>
    </>
  )
}

export default OtherUserNgoView