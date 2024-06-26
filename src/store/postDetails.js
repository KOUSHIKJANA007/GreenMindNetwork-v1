import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, localStorageWithExpiry } from "./helper";



export const fetchPosts = createAsyncThunk("fetchPosts", async (pageNumber) => {
    const response = await fetch(BASE_URL + `/api/posts?pageNumber=${pageNumber}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    return await response.json();
})
export const createPost = createAsyncThunk("createPost", async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(BASE_URL + `/api/post/${data.userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token
        },
        body: JSON.stringify(data.postData)
    })
    return await response.json();
})

export const updatePost = createAsyncThunk("updatePost", async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(BASE_URL + `/api/post/${data.postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token
        },
        body: JSON.stringify(data.postData)
    })
    return await response.json();
})
export const deletePost = createAsyncThunk("deletePost", async (postId) => {
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(BASE_URL + `/api/post/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token
        }
    })
    return await response.json();
})
export const uploadPostImage = createAsyncThunk("uploadPostImage", async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    let formData = new FormData();
    formData.append("image", data.image)
    const response = await fetch(BASE_URL + `/api/post/image/${data.postId}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer" + token
        },
        body: formData
    })
    return await response.json();
})
export const getPostById = (createAsyncThunk("getPostById", async (postId) => {
    const response = await fetch(BASE_URL + `/api/post/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    return await response.json();
}))
export const postByUser = createAsyncThunk("postByUser", async (data) => {
    const response = await fetch(
      BASE_URL + `/api/post/user/${data.userId}?pageNumber=${data.pageNumber}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return await response.json();
})
export const getTotalPost = createAsyncThunk("getTotalPost", async () => {
  const response = await fetch(
    BASE_URL + `/api/post/length`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  return await response.json();
});
export const searchPost = createAsyncThunk("searchPost", async (keyword) => {
    const response = await fetch(BASE_URL + `/api/post/search/${keyword}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    return await response.json();
})
const postSlice = createSlice({
    name: "postSlice",
    initialState: {
        loading: false,
        posts: [],
        singlePost: [],
        isPostCreate: false,
        DeletePost:false,
        EditPost:false,
        totalPostOfUser:0,
        total_post:'0',
        error: null
    },
    reducers: {
        setPost: (state, action) => {
            state.posts = (action.payload);
        },
        setTotalPost: (state, action) => {
            state.total_post = (action.payload);
        },
        setSinglePost: (state, action) => {
            state.singlePost = (action.payload);
        },
        setTotalPostOfUser:(state,action)=>{
            state.totalPostOfUser=action.payload;
        },
        setPostCreatedDone: (state) => {
            state.isPostCreate = true;
        },
        setPostCreatedEnd: (state) => {
            state.isPostCreate = false;
        },
        setDeletePostDone:(state)=>{
            state.DeletePost=true;
        },
        setDeletePostEnd:(state)=>{
            state.DeletePost=false;
        },
        setEditPostDone:(state)=>{
            state.EditPost=true;
        },
        setEditPostEnd:(state)=>{
            state.EditPost=false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true
        }),
            builder.addCase(fetchPosts.fulfilled, (state) => {
                state.loading = false
            }),
            builder.addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
            builder.addCase(createPost.pending, (state) => {
                state.loading = true
            }),
            builder.addCase(createPost.fulfilled, (state) => {
                state.loading = false
            }),
            builder.addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
            builder.addCase(uploadPostImage.pending, (state) => {
                state.loading = true
            }),
            builder.addCase(uploadPostImage.fulfilled, (state) => {
                state.loading = false
            }),
            builder.addCase(uploadPostImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        builder.addCase(postByUser.pending, (state) => {
            state.loading = true
        }),
            builder.addCase(postByUser.fulfilled, (state) => {
                state.loading = false
            }),
            builder.addCase(postByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
            builder.addCase(searchPost.pending, (state) => {
                state.loading = true
            }),
            builder.addCase(searchPost.fulfilled, (state) => {
                state.loading = false
            }),
            builder.addCase(searchPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
            builder.addCase(getPostById.pending, (state) => {
                state.loading = true
            }),
            builder.addCase(getPostById.fulfilled, (state) => {
                state.loading = false
            }),
            builder.addCase(getPostById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
            builder.addCase(updatePost.pending, (state) => {
                state.loading = true
            }),
            builder.addCase(updatePost.fulfilled, (state) => {
                state.loading = false
            }),
            builder.addCase(updatePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
            builder.addCase(deletePost.pending, (state) => {
                state.loading = true
            }),
            builder.addCase(deletePost.fulfilled, (state) => {
                state.loading = false
            }),
            builder.addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            builder.addCase(getTotalPost.pending, (state) => {
            //   state.loading = true;
            }),
              builder.addCase(getTotalPost.fulfilled, (state) => {
                // state.loading = false;
              }),
              builder.addCase(getTotalPost.rejected, (state, action) => {
                // state.loading = false;
                // state.error = action.payload;
              });
    }
})

export const postAction = postSlice.actions;
export default postSlice.reducer;