import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdClose } from "react-icons/md";

const ProfileBox = () => {
    const [toggleProfileCard, setToggleProfileCard] = useState(false);
    const mobileMenuRef = useRef();

    const closeOpenMenus = useCallback(
        (e) => {
            if (
                mobileMenuRef.current &&
                toggleProfileCard &&
                !mobileMenuRef.current.contains(e.target)
            ) {
                setToggleProfileCard(false);
            }
        },
        [toggleProfileCard]
    );
    useEffect(() => {
        document.addEventListener("mousedown", closeOpenMenus);

    }, [closeOpenMenus]);


    const handleProfileCard = () => {
        setToggleProfileCard(true);
    }
    const handleProfileCardCancel = () => {
        setToggleProfileCard(false);
    }
    return (
        <>
            <div className="person_box" ref={mobileMenuRef}>
                <Link to="#"><img className="dp_image" src="image/college.jpg" alt="" onClick={handleProfileCard} /></Link>
                <Link className='dp_name' to="#" onClick={handleProfileCard}>Koushik Jana</Link>
            </div>
            <div className={toggleProfileCard ? "profile_card_container open" : "profile_card_container"}>
                <MdClose onClick={handleProfileCardCancel} className='close_btn' />
                <div className="profile_card_logo">
                    <img src="image/college.jpg" alt="" />
                </div>
                <div className="profile_card_info">
                    <p className="profile_name"><span>Name</span>KoushikJana</p>
                    <p className="profile_dob"><span>DOB</span>06-05-2003</p>
                    <p className="profile_email"><span>Email</span>koushikj389@gmail.com</p>
                    <p className="profile_mobile"><span>Mobile</span>7891085911</p>
                    <p className="profile_joined"><span>Joined</span>13-02-2024</p>
                    <div className="profile_card_button">
                        <button type='submit' className="edit_btn"><Link to="/editprofile">Edit</Link></button>
                        <button className="logout_btn"><Link to="#">Logout</Link></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileBox