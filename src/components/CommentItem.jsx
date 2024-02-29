import React from 'react'

const CommentItem = ({ comment }) => {
  return (
    <>
          <div className='comm_user_con'>
              <img src="" alt="" />
              <p>Koushik jana</p>
          </div>
          <div className="comm_content">

              <div className='comm_user_content'>
                  <p>
                      {comment?.content}
                  </p>
              </div>
          </div>
    </>
  )
}

export default CommentItem