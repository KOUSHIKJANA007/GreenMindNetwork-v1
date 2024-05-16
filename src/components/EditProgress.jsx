import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProgressByEventAndProgress, progressAction, updateEventProgress, uploadProgressImage } from '../store/eventProgressSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { Form } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProgress = ({ progressData, eventId, handleEditViewProgress, openEditProgress }) => {
    const [data, setData] = useState('');
    const [image, setImage] = useState();
    const dispatch = useDispatch();
    const { progress_data } = useSelector((store) => store.eventProgress);
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    useEffect(()=>{
        dispatch(getProgressByEventAndProgress({ progress_no: progressData, eventId: eventId }))
            .then(unwrapResult)
            .then((data) => {
                if (data?.id !== null && data?.id !== undefined) {
                   setData(data);
                   dispatch(progressAction.setProgressValue(data));
                }
            })
    }, [progressData]);
    const handleOnChangeImage = (e) => {
        setImage(e.target.files[0]);
    }
    const handleSubmit = (e) => {
        dispatch(updateEventProgress({ progressId: progress_data?.id, progressData:data }))
        .then(unwrapResult)
        .then((data)=>{
            if (data?.id !== null && data?.id !== undefined) {
                dispatch(uploadProgressImage({ image: image, progressId: data?.id }))
                    .then((data) => {
                       toast.success("Edit Successfully");
                handleEditViewProgress();
                dispatch(progressAction.setEditProgressStart());
                    })
                
            }
        })
    }
  return (
      <div className={openEditProgress ? 'active1 event-add-body' : 'event-add-body'}>
          <Form onSubmit={handleSubmit} className='event-add-progress-container'>
              <h1>edit event progress details</h1>
              <div className="event-add-progress-caption">
                  <label htmlFor="caption">Enter caption</label>
                  <input type="text" value={data?.caption} name="caption" onChange={handleOnChange} id="caption" />
              </div>
              <div className="event-add-progress-totalCost">
                  <label htmlFor="totalCost">Enter cost upto this point</label>
                  <input type="number" value={data?.totalCost} name="totalCost" onChange={handleOnChange} id="totalCost" />
              </div>
              <div className="event-add-progress-image">
                  <label htmlFor="image">upload work progress image</label>
                  <input type="file" name="image" onChange={handleOnChangeImage} id="image" />
              </div>
              <div className="event-add-progress-description">
                  <label htmlFor="description">Description of work progress </label>
                  <textarea value={data?.description} onChange={handleOnChange} rows={8} name="description" id="description" />
              </div>
              <div className="event-add-progress-submit-button">
                  <button type='submit'>edit progress</button>
                  <div className='event-add-progress-back-button' onClick={handleEditViewProgress}>back</div>
              </div>
          </Form>
      </div>
  )
}

export default EditProgress;