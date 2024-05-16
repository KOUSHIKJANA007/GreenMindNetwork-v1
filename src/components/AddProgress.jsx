import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Form } from 'react-router-dom'
import { addEventProgress, progressAction, uploadProgressImage } from '../store/eventProgressSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const AddProgress = ({ handleOpenAddProgress, openAddProgress, progressData, eventId }) => {
  const [data, setData] = useState('');
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    setData({...data,[e.target.name]:e.target.value});
  }
  const handleOnChangeImage = (e) => {
    setImage(e.target.files[0]);
    setData({ ...data, "progress": progressData });
  }
  const handleSubmit = (e) => {
    dispatch(addEventProgress({ eventId: eventId, progressData: data }))
      .then(unwrapResult)
      .then((obj) => {
        if (obj?.id !== null) {
          dispatch(uploadProgressImage({ image: image, progressId: obj?.id }))
            .then((data) => {
              if (data?.payload !== null && data?.payload !== undefined) {
                toast.success("Add progress successfully");
                dispatch(progressAction.setAddProgressStart());
                setData({ "caption": "", "totalCost": "", "description": "" });
                handleOpenAddProgress();
              }
            })
        }
      })
  }
  return (
    <div className={openAddProgress ? 'active event-add-body' : 'event-add-body'}>
      <Form onSubmit={handleSubmit} className='event-add-progress-container'>
        <h1>give event progress details</h1>
        <div className="event-add-progress-caption">
          <label htmlFor="caption">Enter caption</label>
          <input type="text" value={data?.caption}  name="caption" onChange={handleOnChange} id="caption" />
        </div>
        <div className="event-add-progress-totalCost">
          <label htmlFor="totalCost">Enter cost upto this point</label>
          <input type="number" value={data?.totalCost} name="totalCost" onChange={handleOnChange} id="totalCost" />
        </div>
        <div className="event-add-progress-image">
          <label htmlFor="image">upload work progress image</label>
          <input required type="file" name="image" onChange={handleOnChangeImage} id="image" />
        </div>
        <div className="event-add-progress-description">
          <label htmlFor="description">Description of work progress </label>
          <textarea value={data?.description} onChange={handleOnChange} rows={8} name="description" id="description" />
        </div>
        <div className="event-add-progress-submit-button">
          <button type='submit'>add progress</button>
          <div className='event-add-progress-back-button' onClick={handleOpenAddProgress}>back</div>
        </div>
      </Form>
    </div>
  )
}

export default AddProgress