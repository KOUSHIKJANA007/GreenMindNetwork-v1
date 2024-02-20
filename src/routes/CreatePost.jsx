

const CreatePost = () => {
  
    return (
        <>
            <div className="post_container">
                <h2>Enter Post data Here</h2>
                <form className="post_data">
                    <div className="post_input">
                        <label htmlFor="Post_heading">post heading</label>
                        <input className="Post_heading" type="text" id="Post_heading" required/>
                    </div>
                    <div className="post_input">
                        <label htmlFor="Post_sub_heading">post sub heading</label>
                        <input className="Post_sub_heading" type="text" id="Post_sub_heading" required />
                    </div>
                    <div className="post_input">
                        <label htmlFor="Post_image">post image</label>
                        <input className="Post_image" type="file" id="Post_image" required />
                    </div>
                    <div className="post_input">
                        <label htmlFor="Post_content">enter post content</label>
                        <textarea className="Post_content" type="text" id="Post_content" rows={20} required />
                    </div>
                    <div className="post_buttons">
                        <button type='submit' className="post_button">Post</button>
                        <button type='reset' className="reset_button">Reset</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreatePost