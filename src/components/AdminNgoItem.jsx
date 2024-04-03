import React from 'react'
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { BASE_URL } from '../store/helper';

const AdminNgoItem = ({ ngo }) => {
  return (
    <div className='admin_ngo_details_item_content'>
      <div className="admin_ngo_item_img">
        <Link to={`/ngo-details/${ngo?.id}`}><img src={BASE_URL+`/api/ngo/image/${ngo?.logo}`} alt="ngo logo" /></Link>
      </div>
      <div className="admin_ngo_dash_details">
        <div className="admin_ngo_dash_details_name">  <h1><Link to={`/ngo-details/${ngo?.id}`}>{ngo?.name}</Link> </h1></div>
        <div className="admin_ngo_dash_details_contact"><h3><span><MdOutlineEmail className='admin_ngo_dash_icon'/></span>{ngo?.email}</h3>
          <h3><span><HiMiniDevicePhoneMobile className='admin_ngo_dash_icon' /></span>{ngo?.mobile}</h3>
          <h3><span><GrMapLocation className='admin_ngo_dash_icon' /></span>{ngo?.address}</h3></div>
      </div>
    </div>
  )
}

export default AdminNgoItem