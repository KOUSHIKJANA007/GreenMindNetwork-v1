import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Form } from 'react-router-dom'
import { addEventProgress, progressAction, uploadProgressImage } from '../store/eventProgressSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const AddProgress = ({ handleOpenAddProgress, openAddProgress, progressData, eventId }) => {
  const [data, setData] = useState('');
  const [image, setImage] = useState();
  const dispatch=useDispatch();
  const handleOnChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value});
    setData({...data,"progress":progressData});
  }
  const handleOnChangeImage = (e) => {
    setImage(e.target.files[0]);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(addEventProgress({eventId:eventId,progressData:data}))
    .then(unwrapResult)
    .then((obj)=>{
      if(obj?.id !== null){
        dispatch(uploadProgressImage({ image: image, progressId:obj?.id}))
        .then((data)=>{
          if (data?.payload !== null && data?.payload !== undefined){
            toast.success("Add progress successfully");
            dispatch(progressAction.setAddProgressStart());
            setData('');
            handleOpenAddProgress();
          }
        })
      }
    })
  }
  return (
    <div className={openAddProgress ? 'active event-add-body' :'event-add-body'}>
    <Form className='event-add-progress-container'>
        <h1>give event progress details</h1>
          <div className="event-add-progress-caption">
              <label htmlFor="caption">Enter caption</label>
              <input type="text" name="caption" onChange={handleOnChange} id="caption" />
          </div>
          <div className="event-add-progress-image">
            <label htmlFor="image">upload work progress image</label>
            <input type="file" name="image" onChange={handleOnChangeImage} id="image" />
          </div>
          <div className="event-add-progress-description">
              <label htmlFor="description">Description of work progress </label>
              <textarea onChange={handleOnChange} rows={8} name="description" id="description" />
          </div>
          <div className="event-add-progress-submit-button">
            <button onClick={handleSubmit} type='submit'>add progress</button>
            <button onClick={handleOpenAddProgress}>back</button>
          </div>
    </Form>
    </div>
  )
}

export default AddProgress