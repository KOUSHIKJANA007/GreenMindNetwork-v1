import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../store/helper'

const UserNgoItem = ({ ngoDatas }) => {
    const { users } = useSelector((store) => store.user)
    return (
        <div className='all_ngo_item'>
            <div className="all_ngo_item_img">
                <Link><img src={BASE_URL + `/api/ngo/image/${ngoDatas?.logo}`} alt="" /></Link>
            </div>
            <div className="all_ngo_item_name">
                <h2><Link to={`/ngo-content/${users.id}/${ngoDatas?.id}`}>{ngoDatas?.name}</Link></h2>
            </div>
            <div className="all_ngo_item_slogan">
                <p>{ngoDatas?.slogan}</p>
            </div>
        </div>
    )
}

export default UserNgoItem