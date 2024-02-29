import React, { useState } from 'react'
import { BASE_URL } from '../store/helper';
import CommentActionBtn from './CommentActionBtn';
import { useSelector } from 'react-redux';

const CommentItem = ({ comment }) => {
  const { users } = useSelector((store) => store.user)
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  }
  return (
    <>
      <div className='comment_item_container'>
        <div className='comm_user_img'>
          <img src={BASE_URL + `/api/post/image/${comment?.user?.imageName}`} alt="" />
        </div>
        <div className="comm_content">
          <div className="comm_user_name">
            <h4>{comment?.user?.fname + " " + comment?.user?.lname}</h4>
          </div>

          <div className='comm_user_content'>
            <p id='user_message'>{comment?.content}</p>
          </div>
        </div>
        <div className='comment_action'>
          {comment?.user?.id === users?.id &&
            <CommentActionBtn toggle={toggle} commentId={comment?.id} handleToggle={handleToggle} />}
        </div>
      </div>

    </>
  )
}

export default CommentItem