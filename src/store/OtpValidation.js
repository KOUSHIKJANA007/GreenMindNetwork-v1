import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "./helper";

export const emailInput = createAsyncThunk("emailInput", async (data) => {
    const response = await fetch(BASE_URL+"/api/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return await response.json();
})
export const otpInput = createAsyncThunk("otpInput", async (data) => {
    const response = await fetch(BASE_URL+"/api/email/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return await response.json();
})
export const forgotEmail = createAsyncThunk("forgotEmail", async (data) => {
    const response = await fetch(BASE_URL+"/api/email/forgot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return await response.json();
})
export const changePassword = createAsyncThunk("changePassword", async (data) => {
    console.log(data);
    const response = await fetch(BASE_URL+"/api/email/password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return await response.json();
})

const validationSlice = createSlice({
    name: "validationSlice",
    initialState: {
        loading: false,
        useremail: null,
        progress:10
    },
    reducers: {
        setEmail: (state, action) => {
            state.useremail = action.payload;
        },setProgress:(state,action)=>{
            state.progress=action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(emailInput.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(emailInput.fulfilled, (state) => {
                state.loading = false;
            }),
            builder.addCase(emailInput.rejected, (state) => {
                state.loading = false;
            }),
            builder.addCase(otpInput.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(otpInput.fulfilled, (state) => {
                state.loading = false;
            }),
            builder.addCase(otpInput.rejected, (state) => {
                state.loading = false;
            }),
            builder.addCase(forgotEmail.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(forgotEmail.fulfilled, (state) => {
                state.loading = false;
            }),
            builder.addCase(forgotEmail.rejected, (state) => {
                state.loading = false;
            }),
            builder.addCase(changePassword.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
            }),
            builder.addCase(changePassword.rejected, (state) => {
                state.loading = false;
            })
    }
})
export const validationAction = validationSlice.actions;
export default validationSlice.reducer;