import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProgressByEvent, progressAction } from '../store/eventProgressSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { eventAction, getEventById } from '../store/eventDetails';
import { BASE_URL } from '../store/helper';
import { LuView } from "react-icons/lu";
import { IoMdCheckmark } from "react-icons/io";
import AddProgress from '../components/AddProgress';
import { toast } from 'react-toastify';

const EventExplorer = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const { single_event } = useSelector((store) => store.event);
  const { progressList, add_progress } = useSelector((store) => store.eventProgress);
  const { users } = useSelector((store) => store.user);
  const [openAddProgress, setOpenAddProgress] = useState(false);
  const [progressData, setProgressData] = useState(0);
  const handleOpenAddProgress = () => {
    setOpenAddProgress(!openAddProgress);
  }
  useEffect(() => {
    dispatch(getProgressByEvent(eventId))
      .then(unwrapResult)
      .then((data) => {
        if (data !== null && data !== undefined) {
          dispatch(progressAction.setProgressList(data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
    dispatch(getEventById(eventId))
      .then(unwrapResult)
      .then((data) => {
        if (data?.id != null && data?.id != undefined) {
          dispatch(eventAction.setSingleEvent(data))
        }
      })
      .catch((err) => {
        console.log(err);
      })
      dispatch(progressAction.setAddProgressEnd());
  }, [add_progress]);
  let progressOne = progressList.filter((item) => item.progress === 1);
  let progressTwo = progressList.filter((item) => item.progress === 2);
  let progressThree = progressList.filter((item) => item.progress === 3);
  let progressFour = progressList.filter((item) => item.progress === 4);
  let progressFive = progressList.filter((item) => item.progress === 5);
  return (
    <div className='event-explorer-container'>

      <div className="event-header-details">
        <div className="event_explorer_title">
          <h1>{single_event?.title}</h1>
          <div className="event-ngo-logo">
            {single_event?.ngo?.id == users?.id
              ?
              <p>created by <span><Link to={`/ngo-content/${users?.id}/${single_event?.ngo?.id}`}>{single_event?.ngo?.name}</Link></span></p>
              :
              <p>created by <span><Link to={`/ngo-details/${single_event?.ngo?.id}`}>{single_event?.ngo?.name}</Link></span></p>}
            {single_event?.ngo?.id == users?.id
              ?
              <Link to={`/ngo-content/${users?.id}/${single_event?.ngo?.id}`}><img src={BASE_URL + `/api/ngo/image/${single_event?.ngo?.logo}`} alt="" /></Link>
              :
              <Link to={`/ngo-details/${single_event?.ngo?.id}`}><img src={BASE_URL + `/api/ngo/image/${single_event?.ngo?.logo}`} alt="" /></Link>
            }
          </div>
        </div>
        <div className="event-banner-image">
          <img src={BASE_URL + `/api/event/image/${single_event?.image}`} alt="" />
        </div>
      </div>


      <div className="event-progress-main-body">
        <div className="event-tracker-headline">
          <h1>live track event progress</h1>
          <p>How much work done and how much money was spend for this you can check by clicking view icons below.</p>
        </div>
        <ul className="event-progress-points">


          <li>
            <LuView className='icon' />
            <div onClick={() => {
              handleOpenAddProgress()
              setProgressData(1)
            }} className={progressOne[0]?.progress === 1 ? "active progress one" : "progress one"}>
              <p>1</p>
              <IoMdCheckmark className='uil' />
            </div>
            <p className="text">Start</p>
          </li>



          <li>
            <LuView className='icon' />
            {progressOne[0]?.progress === 1
              ?
              <div onClick={() => {
                handleOpenAddProgress()
                setProgressData(2)
              }} className={progressTwo[0]?.progress === 2 ? "active progress two" : "progress two"}>
                <p>2</p>
                <IoMdCheckmark className='uil' />
              </div>
              :
              <div onClick={() => { toast.error("please update start point") }} className={progressTwo[0]?.progress === 2 ? "active progress two" : "progress two"}>
                <p>2</p>
                <IoMdCheckmark className='uil' />
              </div>}
            <p className="text">25%</p>
          </li>



          <li>
            <LuView className='icon' />
            {(progressOne[0]?.progress === 1 && progressTwo[0]?.progress === 2)
              ?
              <div onClick={() => {
                handleOpenAddProgress()
                setProgressData(3)
              }} className={progressThree[0]?.progress === 3 ? "active progress three" : "progress three"}>
                <p>3</p>
                <IoMdCheckmark className='uil' />
              </div>
              :
              <div onClick={() => { toast.error("Please update previous check point") }} className={progressThree[0]?.progress === 3 ? "active progress three" : "progress three"}>
                <p>3</p>
                <IoMdCheckmark className='uil' />
              </div>}
            <p className="text">50%</p>
          </li>



          <li>
            <LuView className='icon' />
            {(progressOne[0]?.progress === 1 && progressTwo[0]?.progress === 2 && progressThree[0]?.progress === 3)
              ?
              <div onClick={() => {
                handleOpenAddProgress()
                setProgressData(4)
              }} className={progressFour[0]?.progress === 4 ? "active progress four" : "progress four"}>
                <p>4</p>
                <IoMdCheckmark className='uil' />
              </div>
              :
              <div onClick={() => { toast.error("Please update previous check point") }} className={progressFour[0]?.progress === 4 ? "active progress four" : "progress four"}>
                <p>4</p>
                <IoMdCheckmark className='uil' />
              </div>}
            <p className="text">75%</p>
          </li>


          <li>
            <LuView className='icon' />
            {(progressOne[0]?.progress === 1 && progressTwo[0]?.progress === 2 && progressThree[0]?.progress === 3 && progressFour[0]?.progress === 4)
              ?
              <div onClick={() => {
                handleOpenAddProgress()
                setProgressData(5)
              }} className={progressFive[0]?.progress === 5 ? "active progress five" : "progress five"}>
                <p>5</p>
                <IoMdCheckmark className='uil' />
              </div>
              :
              <div onClick={() => { toast.error("Please update previous check point") }} className={progressFive[0]?.progress === 5 ? "active progress five" : "progress five"}>
                <p>5</p>
                <IoMdCheckmark className='uil' />
              </div>}
            <p className="text text-five">Completed</p>
          </li>
        </ul>
      </div>

      <div className="event-explorer-description">

      </div>
      <AddProgress eventId={eventId} progressData={progressData} handleOpenAddProgress={handleOpenAddProgress} openAddProgress={openAddProgress} />
    </div>
  )
}

export default EventExplorer;