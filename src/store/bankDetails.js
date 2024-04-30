import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, localStorageWithExpiry } from "./helper";

export const updateBankDetails = createAsyncThunk(
  "updateBankDetails",
  async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(BASE_URL + `/api/bank/${data.bankId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
      body: JSON.stringify(data.bankData),
    });
    return await response.json();
  }
);
export const getBankDetails = createAsyncThunk("getBankDetails", async (ngoId) => {
  const response = await fetch(BASE_URL+`/api/bank/${ngoId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});

const bankDetails = createSlice({
  name: "bankDetails",
  initialState: {
    loading: false,
    bankDetails:null,
    isUpdate:false
  },
  reducers: {
    setBankDetails:(state,action)=>{
      state.bankDetails=action.payload
    },
    setUpdatePending:(state)=>{
      state.isUpdate=true;
    },
    setUpdateEnd:(state)=>{
      state.isUpdate=false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateBankDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateBankDetails.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateBankDetails.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getBankDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBankDetails.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getBankDetails.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export const bankAction=bankDetails.actions;
export default bankDetails.reducer;
