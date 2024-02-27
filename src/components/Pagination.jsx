import React from 'react'
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";

export const Pagination = ({ posts, handlePageNumber }) => {
    return (
        <div className='pagination_container'>
            <div className="previous_button">
                {!posts.posts.pageNumber == 0 &&
                    <button type='submit' onClick={() => handlePageNumber(posts.posts.pageNumber - 1)}><FcPrevious className='previous_icon' /></button>
                }
            </div>
            <div className="page_number_buttons">

                {[...Array(posts.posts.totalPage)].map((item, index) =>
                    <div className="middle_button">
                        <button type='submit'  className='page_numbers' id={posts.posts.pageNumber == index?'active':''} onClick={() => handlePageNumber(index)}>{index + 1}</button>
                    </div>
                )}

            </div>

            <div className="next_button" >
                {!posts.posts.lastPage &&
                    <button onClick={() => handlePageNumber(posts.posts.pageNumber + 1)} type='submit'><FcNext className='next_icon' /></button>}
            </div>
        </div>
    )
}
