import ProgressBar from '@ramonak/react-progress-bar'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NgoEvents = ({ event }) => {
  const { users } = useSelector((store) => store.user);
  let percent = ((event?.collectedAmount) / (event?.targetAmount)) * 100;
  let percentage = Math.round(percent);
  console.log("ngo", event);
  return (
    <>
      {event == null

        ?
        <div className='event_not_created'>
          <h2>No evet create</h2>
          <button><Link>create event for donation</Link></button>
        </div>
        :
        <div className='user_ngo_dash_content_events'>
          <div className="user_ngo_dash_content_events_img">
            <img src="/image/env.avif" alt="" />
          </div>
          <div className="user_ngo_dash_content_events_title">
            <h3><Link>{event?.title}</Link></h3>
          </div>
          <div className="user_ngo_dash_content_events_progress">
            <h4 htmlFor="bar"><span>Target Amount </span>&#8377;{event?.targetAmount}</h4>
            <ProgressBar className='event_progress' bgColor='#78be20' animateOnRender="true" id='bar' height='18px' completed={percentage} />
          </div>
          {event?.ngo?.user?.id == users.id
            ?
            <div className="user_ngo_dash_content_events_buttons">
              <button id='ngo_edit_button' type='submit'><Link>Edit</Link></button>
              <button id='ngo_delete_button' type='submit'><Link>Delete</Link></button>
            </div>
            :
            <div className="user_ngo_dash_content_events_buttons">
              {event?.collectedAmount >= event?.targetAmount
                ?
                <button id='ngo_edit_button' type='submit'><Link>Fullfield</Link></button>
                :
                <button id='ngo_edit_button' type='submit'><Link to={`/donation/${event?.ngo?.id}/${event?.id}`}>donate</Link></button>
              }
              <button id='ngo_delete_button' type='submit'><Link>explore</Link></button>
            </div>}
        </div>
      }
    </>
  )
}

export default NgoEvents  