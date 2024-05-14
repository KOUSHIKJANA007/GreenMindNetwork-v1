import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, localStorageWithExpiry } from "./helper";

export const getProgressByEvent = createAsyncThunk(
  "getProgressByEvent",
  async (eventId) => {
    const response = await fetch(BASE_URL + `/progress/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
);
export const addEventProgress = createAsyncThunk(
  "addEventProgress",
  async (data) => {
    let token=localStorageWithExpiry.getItem('token');
    const response = await fetch(BASE_URL + `/progress/${data.eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
      body:JSON.stringify(data.progressData),
    });
    return await response.json();
  }
);
export const uploadProgressImage = createAsyncThunk(
  "uploadProgressImage",
  async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    let formData = new FormData();
    formData.append("image", data.image);
    const response = await fetch(
      BASE_URL + `/progress/image/upload/${data.progressId}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer" + token,
        },
        body: formData,
      }
    );
    return await response.json();
  }
);
const eventProgressSlice = createSlice({
  name: "eventProgressSlice",
  initialState: {
    loading: false,
    progressList:[],
    add_progress:false,
  },
  reducers: {
    setProgressList:(state,action)=>{
      state.progressList=action.payload;
    },
    setAddProgressStart:(state)=>{
      state.add_progress=true;
    },
    setAddProgressEnd:(state)=>{
      state.add_progress=false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProgressByEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProgressByEvent.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getProgressByEvent.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(addEventProgress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addEventProgress.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addEventProgress.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(uploadProgressImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadProgressImage.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(uploadProgressImage.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const progressAction=eventProgressSlice.actions;
export default eventProgressSlice.reducer;
