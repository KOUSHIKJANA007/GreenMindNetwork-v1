import React, { useEffect } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { deleteEventProgress, getProgressByEventAndProgress, progressAction } from '../store/eventProgressSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { BASE_URL } from '../store/helper';
import { toast } from 'react-toastify';

const EventProgressView = ({ openViewProgress, handleOpenViewProgress, progressData, eventId, handleEditViewProgress,
    progressTwo,
    progressThree,
    progressFour,
    progressFive }) => {


    const dispatch = useDispatch();
    const { progress_data, add_progress, isDeleteProgress, isEditProgress } = useSelector((store) => store.eventProgress);
    const {users}=useSelector((store)=>store.user);
    useEffect(() => {
        if (progressData !== 0) {
            dispatch(getProgressByEventAndProgress({ progress_no: progressData, eventId: eventId }))
                .then(unwrapResult)
                .then((data) => {
                    if (data?.id !== null && data?.id !== undefined) {
                        dispatch(progressAction.setProgressValue(data));
                    }
                })
        }
        dispatch(progressAction.setAddProgressEnd());
        dispatch(progressAction.setDeleteProgressEnd());
        dispatch(progressAction.setEditProgressEnd());
    }, [progressData, add_progress, isDeleteProgress, isEditProgress]);


    const handleDeleteProgress = () => {
        if (progressData===4 && progressFive[0]?.progress === 5){
            toast.error("You can delete only right to left point");
            return;
        }
        if ((progressData === 3 && progressFive[0]?.progress === 5) || (progressData === 3 && progressFour[0]?.progress===4)){
            toast.error("You can delete only right to left point");
            return;
        }
        if ((progressData === 2 && progressFive[0]?.progress === 5) || (progressData === 2 && progressThree[0]?.progress === 3) || (progressData === 2 && progressFour[0]?.progress === 4)){
            toast.error("You can delete only right to left point");
            return;
        }
        if ((progressData === 1 && progressFive[0]?.progress === 5) || (progressData === 1 && progressFour[0]?.progress === 4)||(progressData === 1 && progressThree[0]?.progress === 3) || (progressData === 1 && progressTwo[0]?.progress === 2)){
            toast.error("You can delete only right to left point");
            return;
        }
        dispatch(deleteEventProgress(progress_data?.id))
            .then(unwrapResult)
            .then((data) => {
                if (data?.success === true) {
                    dispatch(progressAction.setDeleteProgressStart());
                    toast.success(data?.message);
                }
            })
            .catch((err) => {
                toast.error(err?.message)
            })
    }
    console.log(progress_data);
    return (
        <div className={openViewProgress ? 'active event-add-body' : 'event-add-body'}>
            <div className='event-progress-view-container'>
                <IoCloseCircle onClick={handleOpenViewProgress} className='progress-close-icon' />
                <div className="event-progress-view-caption">
                    <h1>{progress_data?.caption}</h1>
                </div>
                <div className="event-progress-cost">
                    <div className='event-progress-cost-upto'>
                        <h3>cost upto this progress</h3>
                        <p>&#8377; {progress_data?.totalCost}</p>
                    </div>
                    <div className='event-progress-cost-remain'>
                        <h3>remaining amount</h3>
                        <p>&#8377; {(progress_data?.event?.collectedAmount) - (progress_data?.totalCost)}</p>
                    </div>
                </div>
                <div className="event-progress-view-image">
                    <img src={BASE_URL + `/progress/image/${progress_data?.imageName}`} alt="" />
                </div>
                <div className="event-progress-view-desc">
                    <h1>details of how much work done</h1>
                    <p>{progress_data?.description}</p>
                </div>
      {users?.id===progress_data?.event?.ngo?.user?.id && <div className="event-progress-view-buttons">
                   <button className='progress-btn1' onClick={()=>{
                    handleOpenViewProgress();
                    handleEditViewProgress();
                   }}>edit</button>
                   <button className='progress-btn2' onClick={() => {
                        handleDeleteProgress();
                        handleOpenViewProgress();
                    }}>delete</button>
                </div>
       }
            </div>
        </div>
    )
}

export default EventProgressView