import React, { useState } from 'react'
import { BASE_URL } from '../store/helper';
import { useNavigate } from 'react-router-dom';
import { deleteUser, loginAction } from '../store/userDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { blockListAction, blockUser, unBlockUser } from '../store/blockList';

const AdminUserItem = ({ users }) => {
  const { isBlocked } = useSelector((store) => store.blocklist);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [block, setBlock] = useState(isBlocked);
  const handleContent = () => {
    navigate(`/user-content/${users?.id}`);
  }
  const handleDeleteUser = () => {
    let c = confirm("Are you sure?")
    if (c) {
      dispatch(deleteUser(users?.id))
        .then(unwrapResult)
        .then((data) => {
          console.log(data);
          if (data.success == true) {
            toast.success(data.message);
            dispatch(loginAction.setDeleteDone())
          }
          else {
            toast.error(data.message);
          }
        })
    }

  }

  const handleBlock = () => {
    dispatch(blockUser(users?.id))
      .then(unwrapResult)
      .then((data) => {
        if (data.success == true) {
          toast.success(data.message)
          dispatch(blockListAction.setBlockeStatus());
         setBlock(true);
        }
      })
  }
  const handleUnBlock = () => {
    dispatch(unBlockUser(users?.id))
      .then(unwrapResult)
      .then((data) => {
        if (data.success == true) {
          toast.success(data.message)
          dispatch(blockListAction.setUnBlockeStatus());
         setBlock(false);
        }
      })
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
          {block
            ?
            <button id='admin_block_button' onClick={handleUnBlock}>unblock</button>
          :
          <button id='admin_block_button'onClick={handleBlock} >block</button>}
          <button onClick={handleDeleteUser} id='admin_delete_button'>delete</button>
        </div>
      </div>
    </>
  )
}

export default AdminUserItem