import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { eventAction, getAllEvent } from '../store/eventDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import NgoEvents from '../components/NgoEvents';

const UserHome = () => {
    document.title = "Dashboard";
    const dispatch = useDispatch();
    const { users } = useSelector((store) => store.user);
    const { events } = useSelector((store) => store.event);
    useEffect(() => {
        dispatch(getAllEvent())
            .then(unwrapResult)
            .then((data) => {
                dispatch(eventAction.setEvent(data));
            })
    }, [])
    const filteredEvent = events?.filter((item) => {
        return item?.ngo?.user?.id != users?.id;
    });
    const filteredEvent1 = filteredEvent?.filter((item, index) => {
        return index < 5;
    });
    return (
        <>
            <div className="user_home_main_container">
                <div className="user_home_container">
                    <div className="user_home_content">
                        <div className="user_home_1st_content">
                            <div className="user_home_content_details">
                                <h1>what is environmental awereness?</h1>
                                <p>Environmental awareness refers to an understanding and recognition of the various environmental issues facing our planet and the importance of taking action to address them. Here are some points highlighting aspects of environmental awareness.</p>
                            </div>
                            <div className="user_home_content_img">
                                <img src="/image/pic1.jpg" alt="" />
                            </div>
                        </div>
                        <div className="user_home_2nd_content">
                            <div className="user_home_content_img">
                                <img src="/image/pic3.jpg" alt="" />
                            </div>
                            <div className="user_home_content_details">
                                <h1>Importance of Conservation</h1>
                                <p> It emphasizes the importance of conserving natural resources, protecting endangered species, preserving ecosystems, and maintaining ecological balance for the well-being of present and future generations.</p>
                            </div>
                        </div>
                        <div className="user_home_1st_content">
                            <div className="user_home_content_details">
                                <h1>Understanding of Environmental Issues</h1>
                                <p>Environmental awareness involves knowledge and comprehension of key environmental challenges such as climate change, deforestation, pollution (air, water, soil), loss of biodiversity, habitat destruction, and resource depletion.</p>
                            </div>
                            <div className="user_home_content_img">
                                <img src="/image/pic2.avif" alt="" />
                            </div>
                        </div>
                        <div className="user_home_2nd_content">
                            <div className="user_home_content_img">
                                <img src="/image/pic4.jpg" alt="" />
                            </div>
                            <div className="user_home_content_details">
                                <h1>Recognition of Human Impact</h1>
                                <p> Environmental awareness acknowledges the significant impact of human activities on the environment, including industrialization, urbanization, overconsumption, and unsustainable resource extraction.</p>
                            </div>
                        </div>
                    </div>
                    <div className="user_home_events_container">
                        <h1>you can donate in our partner ngo</h1>
                        <div className="user_home_events">
                            {filteredEvent1?.map((item) =>
                                <NgoEvents key={item.id} event={item} ngo={item?.ngo?.id} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserHome