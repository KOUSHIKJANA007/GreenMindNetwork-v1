import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const emailInput = createAsyncThunk("emailInput", async (data) => {
    const response = await fetch("http://localhost:8080/api/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return await response.json();
})
export const otpInput = createAsyncThunk("otpInput", async (data) => {
    const response = await fetch("http://localhost:8080/api/email/verify", {
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
            })
    }
})
export const validationAction = validationSlice.actions;
export default validationSlice.reducer;