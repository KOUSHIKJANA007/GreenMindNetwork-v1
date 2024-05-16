import ProgressBar from '@ramonak/react-progress-bar'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteEvent, eventAction } from '../store/eventDetails'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { BASE_URL } from '../store/helper'

const NgoEvents = ({ event, ngo }) => {
  const dispatch=useDispatch();
  const { users } = useSelector((store) => store.user);
  let percent = ((event?.collectedAmount) / (event?.targetAmount)) * 100;
  let percentage = Math.round(percent);
  const handleDelete=()=>{
    let c = confirm("Are your sure to delete ?")
    if(c){
      dispatch(deleteEvent(event?.id))
        .then(unwrapResult)
        .then((data) => {
          dispatch(eventAction.setDeletePending())
          toast.success(data.message);
        })
    }
  }
  return (
    <>
      {event == null 

        ?
        <div className='event_not_created'>
          <h2>No evet create</h2>
          {ngo?.user?.id == users.id && <button><Link to={`/create-event/${ngo?.id}`}>create event for donation</Link></button>}
        </div>
        :
        <div className='user_ngo_dash_content_events'>
          <div className="user_ngo_dash_content_events_img">
            <img src={BASE_URL+`/api/event/image/${event?.image}`} alt="" />
          </div>
          <div className="user_ngo_dash_content_events_title">
            <h3><Link to={`/event-explorer/${event?.id}`}>{event?.title}</Link></h3>
          </div>
          <div className="user_ngo_dash_content_events_progress">
            <h4 htmlFor="bar"><span>Target Amount </span>&#8377;{event?.targetAmount}</h4>
            <ProgressBar className='event_progress' bgColor='#78be20' animateOnRender="true" id='bar' height='18px' completed={percentage} />
          </div>
          {event?.ngo?.user?.id == users.id
            ?
            <div className="user_ngo_dash_content_events_buttons">
              <button id='ngo_edit_button' type='submit'><Link to={`/edit-event/${event?.id}/${event?.ngo?.id}`}>Edit</Link></button>
              <button id='ngo_delete_button' type='submit' onClick={handleDelete}><Link>Delete</Link></button>
            </div>
            :
            <div className="user_ngo_dash_content_events_buttons">
              {event?.collectedAmount >= event?.targetAmount
                ?
                <button id='ngo_edit_button' type='submit'><Link>Fullfield</Link></button>
                :
                <button id='ngo_edit_button' type='submit'><Link to={`/donation/${event?.ngo?.id}/${event?.id}`}>donate</Link></button>
              }
              <button id='ngo_delete_button' type='submit'><Link to={`/event-explorer/${event?.id}`}>explore</Link></button>
            </div>}
        </div>
      }
    </>
  )
}

export default NgoEvents  