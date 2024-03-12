import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Ngo = () => {
    document.title = "NGO Partner Programme"
    const { isLogin }=useSelector((store)=>store.user);
    return (
        <>
            <div className="ngo_container">
                <div className="ngo_1st_container">
                    <div className="ngo_image_container">
                        <img className="ngo_image" src="image/ngo.jpg" alt="" />
                    </div>
                    <div className="ngo_heading_container">
                        <h1>welcome to our NGO partner programme</h1>
                        <p>Join our Environmental NGO Partner programme and become part of a dynamic and collaborative network dedicated to preserving and restoring the environment. By joining forces with other passionate organizations, you'll have the opportunity to leverage collective expertise, resources, and influence to address pressing environmental issues. Gain access to capacity-building workshops, funding opportunities, and advocacy initiatives to enhance your organization's impact. Together, we can create meaningful change and build a sustainable future for generations to come. Join us in making a difference today!</p>
                        <div className="ngo_button">
                            <button type='submit'> 
                            {
                            isLogin ?
                                    <Link  to="/ngo-register">Join our programme</Link>
                                    :
                                        <Link to="/email-input">Join our programme</Link>
                            }
                                    </button>
                        </div>
                    </div>

                </div>
                <div className="ngo_2nd_container">

                    <div className="ngo_2nd_heading_container">
                        <h1>benifits of joining our NGO partner programme</h1>
                        <p>NGOs can connect with other charitable organizations and potentially collaborate on projects or share resources through your donation platform. This networking can lead to valuable partnerships and synergies that enhance the effectiveness of their work.Being associated with a reputable donation website can enhance the credibility of participating NGOs. Donors may feel more confident contributing to organizations listed on a trusted platform, which can lead to increased donations and support.</p>
                        <div className="ngo_2nd_button">
                            <button type='submit'>
                                {
                                    isLogin ?
                                        <Link to="/ngo-register">Join our programme</Link>
                                        :
                                        <Link to="/email-input">Join our programme</Link>
                                }
                            </button>
                        </div>

                    </div>
                    <div className="ngo_2nd_image_container">
                        <img className="ngo_2nd_image" src="image/env.avif" alt="" />
                    </div>
                </div>
                <div className="ngo_1st_container">
                    <div className="ngo_image_container">
                        <img className="ngo_image" src="image/waste.jpg" alt="" />
                    </div>
                    <div className="ngo_heading_container">
                        <h1>creating awarness events and request for donate </h1>
                        <p>Join our Environmental NGO Partner programme and create awareness camps or events like plant trees,clean the environment etc by giving some information about your events and raise a huge funds from our trusted users.For creating events you need to register your NGO or institution on our trusted website.</p>
                        <div className="ngo_button">
                            <button type='submit'>
                                {
                                    isLogin ?
                                        <Link to="/ngo-register">Join our programme</Link>
                                        :
                                        <Link to="/email-input">Join our programme</Link>
                                }
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Ngo