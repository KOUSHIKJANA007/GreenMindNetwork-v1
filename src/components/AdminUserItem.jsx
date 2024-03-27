import React from 'react'
import { BASE_URL } from '../store/helper';
import { useNavigate } from 'react-router-dom';

const AdminUserItem = ({ users }) => {
  const navigate = useNavigate();
  const handleContent = () => {
    navigate(`/user-content/${users?.id}`);
  }
  return (
    <>
      <div className="admin_user_item_container">
        <div className="admin_user_item_id">
          <p>ID: {users?.id}</p>
        </div>
        <div onClick={handleContent} className="admin_user_item_logo">
          <img src={BASE_URL + "/api/user/image/" + users?.imageName} alt="" />
        </div>
        <div onClick={handleContent} className="admin_user_item_name">
          <p>{users?.fname + " " + users?.lname}</p>
        </div>
        <div onClick={handleContent} className="admin_user_item_email">
          <p>{users?.email}</p>
        </div>
        <div className="admin_user_item_buttons">
          <button id='admin_block_button'>block</button>
          <button id='admin_delete_button'>delete</button>
        </div>
      </div>
    </>
  )
}

export default AdminUserItem