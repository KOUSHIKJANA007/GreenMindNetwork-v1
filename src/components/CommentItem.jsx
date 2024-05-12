import React, { useState } from 'react'
import { BASE_URL } from '../store/helper';
import CommentActionBtn from './CommentActionBtn';
import { useSelector } from 'react-redux';
import EditComment from '../components/EditComment'

const CommentItem = ({ comment }) => {
  const { users } = useSelector((store) => store.user)
  const [toggle, setToggle] = useState(false);
  const [editform, setEditform] = useState(false);
  const handleEditForm = () => {
    setEditform(!editform)
  }
  const handleToggle = () => {
    setToggle(!toggle);
  }
  return (
    <>
      <div className='comment_item_container'>
        <div className='comm_user_img'>
          <img src={BASE_URL + `/api/user/image/${comment?.user?.imageName}`} alt="" />
        </div>
        {editform ?

          <EditComment comment={comment} handleEditForm={handleEditForm} />
          :
          <div className="comm_content">
            <div className="comm_user_name">
              <h4>{comment?.user?.fname + " " + comment?.user?.lname}</h4>
            </div>

            <div className='comm_user_content'>
              <p id='user_message'>{comment?.content}</p>
            </div>
          </div>}
        <div className='comment_action'>
          {comment?.user?.id === users?.id && !editform &&
            <CommentActionBtn toggle={toggle} handleEditForm={handleEditForm} commentId={comment?.id} handleToggle={handleToggle} />}
        </div>
      </div>

    </>
  )
}

export default CommentItem