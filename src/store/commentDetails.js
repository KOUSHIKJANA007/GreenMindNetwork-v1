import { createAsyncThunk, createSlice, isDraft } from "@reduxjs/toolkit";
import { localStorageWithExpiry } from "./helper";


export const createComment = createAsyncThunk("createComment", async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(`http://localhost:8080/api/comment/user/${data.userId}/post/${data.postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token
        },
        body: JSON.stringify({"content":data.commentData})
    });
    return await response.json();
})
export const getCommentByPost = createAsyncThunk("getCommentByPost",async(postId)=>{
    const response = await fetch(`http://localhost:8080/api/comment/${postId}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    return await response.json();
})

export const deleteComment = createAsyncThunk("deleteComment", async (commentId)=>{
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(`http://localhost:8080/api/comment/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token
        }
    })
    return await response.json();
})
export const updateComment = createAsyncThunk("updateComment",async(data)=>{
    let token = localStorageWithExpiry.getItem("token");
    console.log("edit data",data);
    const response = await fetch(`http://localhost:8080/api/comment/${data.commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token
        },
        body: JSON.stringify({ "content": data.content.content })
    });
    return await response.json();
})
const commentDetails = createSlice({
    name: "commentDetails",
    initialState: {
        loading: false,
        error: null,
        isDelete:false,
        isEdit:false,
        isComment: false,
        comment:[]
    },
    reducers: {
        addCommentDone: (state) => {
            state.isComment = true;
        },
        addCommentEnd: (state) => {
            state.isComment = false;
        },
        setComment:(state,action)=>{
            state.comment=action.payload;
        },
        deleteStatusDone:(state)=>{
            state.isDelete=true
        },
        deleteStatusEnd:(state)=>{
            state.isDelete=false
        },
        editStatusStart:(state)=>{
            state.isEdit=true
        },
        editStatusEnd:(state)=>{
            state.isEdit=false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createComment.pending, (state, action) => {
            state.loading = true;
        }),
            builder.addCase(createComment.fulfilled, (state, action) => {
                state.loading = false;
            }),
            builder.addCase(createComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
            builder.addCase(getCommentByPost.pending, (state, action) => {
            state.loading = true;
        }),
            builder.addCase(getCommentByPost.fulfilled, (state, action) => {
                state.loading = false;
            }),
            builder.addCase(getCommentByPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
            builder.addCase(deleteComment.pending, (state, action) => {
            state.loading = true;
        }),
            builder.addCase(deleteComment.fulfilled, (state, action) => {
                state.loading = false;
            }),
            builder.addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
            builder.addCase(updateComment.pending, (state, action) => {
            state.loading = true;
        }),
            builder.addCase(updateComment.fulfilled, (state, action) => {
                state.loading = false;
            }),
            builder.addCase(updateComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export const commentAction = commentDetails.actions;
export default commentDetails.reducer;