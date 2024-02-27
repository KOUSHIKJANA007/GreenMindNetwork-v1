import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localStorageWithExpiry } from "./helper";



export const fetchPosts = createAsyncThunk("fetchPosts", async (pageNumber) => {
    const response = await fetch(`http://localhost:8080/api/posts?pageNumber=${pageNumber}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    return await response.json();
})
export const createPost = createAsyncThunk("createPost", async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(`http://localhost:8080/api/post/${data.userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token
        },
        body: JSON.stringify(data.postData)
    })
    return await response.json();
})

export const uploadPostImage = createAsyncThunk("uploadPostImage", async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    let formData = new FormData()
    formData.append("image", data.image)
    const response = await fetch(`http://localhost:8080/api/post/image/${data.postId}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer" + token
        },
        body: formData
    })
    return await response.json();
})
export const getPostById = (createAsyncThunk("getPostById", async (postId) => {
    const response = await fetch(`http://localhost:8080/api/post/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    return await response.json();
}))
export const postByUser = createAsyncThunk("postByUser", async (data) => {
    const response = await fetch(`http://localhost:8080/api/post/user/${data.userId}?pageNumber=${data.pageNumber}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    return await response.json();
})
export const searchPost = createAsyncThunk("searchPost", async (keyword) => {
    const response = await fetch(`http://localhost:8080/api/post/search/${keyword}`, {
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
        error: null
    },
    reducers: {
        setPost: (state, action) => {
            state.posts = (action.payload);
        },
        setSinglePost: (state, action) => {
            state.singlePost = (action.payload);
            console.log("post details", action.payload)
        },
        setPostCreatedDone: (state) => {
            state.isPostCreate = true;
        },
        setPostCreatedEnd: (state) => {
            state.isPostCreate = false;
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
            })
    }
})

export const postAction = postSlice.actions;
export default postSlice.reducer;