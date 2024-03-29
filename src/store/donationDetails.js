import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localStorageWithExpiry } from "./helper";

export const createPayment = createAsyncThunk("createPayment", async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(`http://localhost:8080/api/donation/user/${data.userId}/ngo/${data.ngoId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token
        },
        body: JSON.stringify({ "amount": data.amountToPay })
    })
    return await response.json();
})
export const updatePayment = createAsyncThunk("updatePayment", async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(
      `http://localhost:8080/api/donation/${data.eventId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
        body: JSON.stringify(data),
      }
    );
    return await response.json();
})
export const getTotalAmount = createAsyncThunk("getTotalAmount", async (userId) => {
    const response = await fetch(
      `http://localhost:8080/api/donation/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
    return await response.json();
});
const donationDetails = createSlice({
    name: "donationDetails",
    initialState: {
        loading: false,
        total_donation:0
    },
    reducers:{
        setDonationAmount:(state,action)=>{
            state.total_donation=action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createPayment.pending, (state, action) => {
            state.loading = true;
        }),
            builder.addCase(createPayment.fulfilled, (state, action) => {
                state.loading = false;
            }),
            builder.addCase(createPayment.rejected, (state, action) => {
                state.loading = false;
            }),
            builder.addCase(updatePayment.pending, (state, action) => {
            state.loading = true;
        }),
            builder.addCase(updatePayment.fulfilled, (state, action) => {
                state.loading = false;
            }),
            builder.addCase(updatePayment.rejected, (state, action) => {
                state.loading = false;
            })
            builder.addCase(getTotalAmount.pending, (state, action) => {
            //   state.loading = true;
            }),
              builder.addCase(getTotalAmount.fulfilled, (state, action) => {
                // state.loading = false;
              }),
              builder.addCase(getTotalAmount.rejected, (state, action) => {
                // state.loading = false;
              });
    }
})
export const donationAction = donationDetails.actions;
export default donationDetails.reducer;