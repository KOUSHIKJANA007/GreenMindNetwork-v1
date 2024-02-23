import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk("createUser", async (data) => {

    const response = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await response.json();
})
export const updateUser = createAsyncThunk("updateUser", async (data) => {

    let token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/user/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer" + token
        },
        body: JSON.stringify(data)
    })
    return await response.json();
})

export const loginUser = createAsyncThunk("loginUser", async (data) => {
    const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return await response.json();
})

export const uploadUserImage = createAsyncThunk("uploadUserImage", async (data) => {
    let formData = new FormData();
    let image = data.image;
    formData.append("image", image);
    let token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/user/image/upload/${data.userId}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer" + token
        },
        body: formData
    })
    const res = await response.json();
    return res;
})
export const fetchUserById = createAsyncThunk("fetchUserById", async (userId) => {
    const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    return await response.json();
})
const userSlice = createSlice({
    name: "userDetail",
    initialState: {
        loading: false,
        error: null,
        isLogin: false,
        users: [],
        isEdit:false
    },
    reducers: {
        doLogin: (state) => {
            state.isLogin = true;
        },
        doLogout: (state) => {
            localStorage.removeItem("data")
            localStorage.removeItem("token")
            state.isLogin = false;
        },
        setUser: (state, action) => {
            state.users = action.payload;
        },
        setEditDone: (state) => {
            state.isEdit = true;
        },
        setEditEnd: (state) => {
            state.isEdit = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(createUser.fulfilled, (state) => {
                state.loading = false;
            }),
            builder.addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
            builder.addCase(loginUser.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                // state.users = action.payload;
            }),
            builder.addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
            builder.addCase(updateUser.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                console.log("after edit", action.payload)
            }),
            builder.addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
            builder.addCase(uploadUserImage.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(uploadUserImage.fulfilled, (state, action) => {
                state.loading = false;
                console.log("After upload", action.payload);
            }),
            builder.addCase(uploadUserImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
            builder.addCase(fetchUserById.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                console.log("user data from db", action.payload)
            }),
            builder.addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const loginAction = userSlice.actions;
export default userSlice.reducer;