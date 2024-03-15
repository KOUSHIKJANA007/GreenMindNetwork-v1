import ProgressBar from '@ramonak/react-progress-bar'
import React from 'react'
import { Link } from 'react-router-dom'

const NgoEvents = () => {
  return (
      <div className='user_ngo_dash_content_events'>
          <div className="user_ngo_dash_content_events_img">
            <img src="/image/env.avif" alt="" />
          </div>
          <div className="user_ngo_dash_content_events_title">
              <h3><Link>This is title of event</Link></h3>
          </div>
          <div className="user_ngo_dash_content_events_progress">
            <label htmlFor="bar">$200</label>
           <ProgressBar className='event_progress' bgColor='#78be20' animateOnRender="true" customLabel='$10' id='bar' height='18px' completed={80}/>
          </div>
          <div className="user_ngo_dash_content_events_buttons">
            <button id='ngo_edit_button' type='submit'><Link>Edit</Link></button>
              <button id='ngo_delete_button' type='submit'><Link>Delete</Link></button>
          </div>
    </div>
  )
}

export default NgoEvents  