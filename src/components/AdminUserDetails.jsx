import React from 'react'
import AdminUserItem from './AdminUserItem'
import {useSelector } from 'react-redux';

const AdminUserDetails = () => {
    const { allUsers } = useSelector((store) => store.user);
    return (
        <div className='admin_user_details_main_container'>
          <div className='admin_user_details_container'>
                <div className="admin_user_details_container_search">
                    <input type="text" placeholder='Search By Email....' />
                    <button>search</button>
                </div>
            </div>
            {allUsers?.map((item)=>
                <AdminUserItem key={item?.id}  users={item} />
            )}
        </div>
    )
}

export default AdminUserDetails