import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { eventAction, getAllEvent } from '../store/eventDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import NgoEvents from '../components/NgoEvents';

const DonationDashboard = () => {
  const dispatch=useDispatch();
  const { events }=useSelector((store)=>store.event)
  const {users}=useSelector((store)=>store.user)
  useEffect(()=>{
    dispatch(getAllEvent())
    .then(unwrapResult)
    .then((data)=>{
      dispatch(eventAction.setEvent(data))
    })
  },[])
  return (
    <>
      <div className="donation_dash_container">
        <div className="donation_dash_1st_container">
          <div className="donation_dash_image">
            <img src="image/donate.jpg" alt="" />
            <div className="donation_dash_content">
              <h1>Support Environmental Conservation: Donate Today!</h1>
              <p>Help preserve biodiversity, combat climate change, and protect natural resources.
                Your donation empowers local communities, supports wildlife conservation, and promotes clean energy initiatives.
                Make a tangible impact by funding habitat restoration, reforestation, and environmental advocacy.
                Together, we can create a healthier, more sustainable future for generations to come.
                Join us in our mission to heal our planet—donate now and be a part of the solution!</p>
            </div>
          </div>
         
          <div className="donation_dash_ngo_events">
           <div className="donation_dash_ngo_event_heading">
              <h1>Donate Our Partner NGOs </h1>
           </div>
            <div className="donation_dash_ngo_event_items">
              {events?.map((item)=>
              <NgoEvents key={item.id} event={item} ngo={null}/>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DonationDashboard