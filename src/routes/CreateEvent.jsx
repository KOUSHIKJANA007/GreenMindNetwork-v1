import JoditEditor from 'jodit-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { createEvent, eventAction, uploadEventImage } from '../store/eventDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const CreateEvent = () => {
   
    const editor = useRef(null);
    const { users } = useSelector((store) => store.user);
    const { isCreate } = useSelector((store) => store.event);
    const dispatch = useDispatch();
    const { ngoId } = useParams();
    const navigate = useNavigate()
    const [description, setDescription] = useState('');
    const [eventData, setEventData] = useState('');
    const [image, setImage] = useState('');
    useEffect(()=>{
        window.scroll(0, 0);
    },[])
    const handleOnChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
        console.log(eventData);
    }
    const handleDescription = (data) => {
        setEventData({ ...eventData, 'description': data });
    }
    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(createEvent({ ngoId: ngoId, eventData: eventData }))
            .then(unwrapResult)
            .then((data) => {
                if (data?.id != '0') {
                    dispatch(uploadEventImage({ image: image, eventId: data.id }))
                        .then(unwrapResult)
                        .then((obj) => {
                            console.log(obj);
                            dispatch(eventAction.setCreatePending());
                        })
                    toast.success("Event created");
                    navigate(`/ngo-content/${users?.id}/${ngoId}`);
                }
                else {
                    toast.error("Something went wrong !!")
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
    }
    return (
        <div className='create_ngo_event_main_container'>
            <Form onSubmit={handleSubmit} className="create_ngo_event_container">
                <h1>enter your event details</h1>
                <div className="create_ngo_event_input">
                    <label htmlFor="title">Enter your event name</label>
                    <input type="text" name="title" id='title' onChange={handleOnChange} />
                </div>
                <div className="create_ngo_event_input">
                    <label htmlFor="targetAmount">Enter final donation amount</label>
                    <input type="number" name="targetAmount" id='targetAmount' onChange={handleOnChange} />
                </div>
                <div className="create_ngo_event_input_image">
                    <label htmlFor="image">Enter your event poster</label>
                    <input onChange={handleImage} type="file" name="image" id='image' />
                </div>
                <div className="create_ngo_event_input">
                    <label htmlFor="description">Enter your event description</label>
                    <JoditEditor
                        editor={editor}
                        value={description}
                        onChange={handleDescription}
                    />
                </div>

                <div className="create_ngo_event_button">
                    <button type='submit'>create event</button>
                </div>
            </Form>
        </div>
    )
}

export default CreateEvent