import ProgressBar from '@ramonak/react-progress-bar'
import React from 'react'
import { Link } from 'react-router-dom'

const NgoEvents = ({event}) => {
  let percent=((event?.collectedAmount)/(event?.targetAmount))*100;
 let percentage=Math.round(percent);
 console.log(percentage);
  return (
      <div className='user_ngo_dash_content_events'>
          <div className="user_ngo_dash_content_events_img">
            <img src="/image/env.avif" alt="" />
          </div>
          <div className="user_ngo_dash_content_events_title">
              <h3><Link>{event?.title}</Link></h3>
          </div>
          <div className="user_ngo_dash_content_events_progress">
        <h4 htmlFor="bar"><span>Target Amount </span>&#8377;{event?.targetAmount}</h4>
        <ProgressBar className='event_progress' bgColor='#78be20' animateOnRender="true" id='bar' height='18px' completed={percentage}/>
          </div>
          <div className="user_ngo_dash_content_events_buttons">
            <button id='ngo_edit_button' type='submit'><Link>Edit</Link></button>
              <button id='ngo_delete_button' type='submit'><Link>Delete</Link></button>
          </div>
    </div>
  )
}

export default NgoEvents  