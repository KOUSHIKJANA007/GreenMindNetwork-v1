import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localStorageWithExpiry } from "./helper";

export const createEvent = createAsyncThunk("createEvent", async (ngoId) => {
  let token = localStorageWithExpiry.getItem("token");
  const response = await fetch(`http://localhost:8080/api/event/${ngoId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + token,
    },
    body: JSON.stringify(data.postData),
  });
  return await response.json();
});
export const uploadEventImage = createAsyncThunk("uploadEventImage", async (data) => {
  let token = localStorageWithExpiry.getItem("token");
  const response = await fetch(`http://localhost:8080/api/event/image/${ngoId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + token,
    },
    body: JSON.stringify(data.postData),
  });
  return await response.json();
});
export const getEventByNgo = createAsyncThunk("getEventByNgo", async (ngoId) => {
     const response = await fetch(`http://localhost:8080/api/event/${ngoId}`,{
         method: "GET",
         headers: {
           "Content-Type": "application/json",
         },
       });
       return await response.json();
});

const eventDetails = createSlice({
  name: "eventDetails",
  initialState: {
    loading: false,
    events:null
  },
  reducers: {
    setEvent:(state,action)=>{
        state.events=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getEventByNgo.pending,(state,action)=>{
        state.loading=true;
    })
    builder.addCase(getEventByNgo.fulfilled,(state,action)=>{
        state.loading=false;
    })
    builder.addCase(getEventByNgo.rejected,(state,action)=>{
        state.loading=false;
    })
    builder.addCase(createEvent.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.loading = false;
    })
    builder.addCase(createEvent.rejected, (state, action) => {
      state.loading = false;
    })
    builder.addCase(uploadEventImage.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(uploadEventImage.fulfilled, (state, action) => {
      state.loading = false;
    })
    builder.addCase(uploadEventImage.rejected, (state, action) => {
      state.loading = false;
    })
  },
});
export const eventAction=eventDetails.actions;
export default eventDetails.reducer;
