import React from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../store/helper';

const NgoItem = ({ ngoDatas }) => {
    return (
        <div className='all_ngo_item'>
            <div className="all_ngo_item_img">
                <Link><img src={BASE_URL+`/api/ngo/image/${ngoDatas?.logo}`} alt="" /></Link>
            </div>
            <div className="all_ngo_item_name">
                <h2><Link>{ngoDatas?.name}</Link></h2>
            </div>
            <div className="all_ngo_item_slogan">
                <p>{ngoDatas?.slogan}</p>
            </div>
        </div>
    )
}

export default NgoItem