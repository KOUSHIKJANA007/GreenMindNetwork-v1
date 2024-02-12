import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer>
                <div className="info">
                    <ul className="resource">
                        <li><b>resource</b></li>
                        <li><Link to="#">financials</Link></li>
                        <li><Link to="#">related topics</Link></li>
                    </ul>
                    <ul className="get_to_know">
                        <li><b>get to know</b></li>
                        <li><Link to="#">blog</Link></li>
                        <li><Link to="#">news</Link></li>
                        <li><Link to="#">meet our team</Link></li>
                    </ul>
                    <ul className="connect">
                        <li><b>connect</b></li>
                        <li><Link to="#">contact us</Link></li>
                        <li><Link to="#">jobs & internships</Link></li>
                        <li><Link to="#">business partnerships</Link></li>
                    </ul>
                </div>
                <hr />
                <div className="slogan">
                    <p>Green Mind Network is located in Kolkata,India</p>
                </div>
                <ul className="copyright">
                    <li>2024</li>
                    <li>Green Mind Network</li>
                    <li>ein: 21-757938</li>
                    <li>policies</li>
                </ul>
                <ul className="social_icons">
                    <li><Link to="#"><FaXTwitter /></Link></li>
                    <li><Link to="#"><FaFacebook /></Link></li>
                    <li><Link to="#"><FaLinkedin /></Link></li>
                    <li><Link to="#"><FaYoutube /></Link></li>
                    <li><Link to="#"><FaInstagram /></Link></li>
                </ul>
            </footer>
        </>
    )
}

export default Footer