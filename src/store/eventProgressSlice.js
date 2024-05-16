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
export const getProgressByEventAndProgress = createAsyncThunk(
  "getProgressByEventAndProgress",
  async (data) => {
    const response = await fetch(
      BASE_URL + `/progress/event-progress/${data.progress_no}/event/${data.eventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
export const updateEventProgress = createAsyncThunk(
  "updateEventProgress",
  async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(BASE_URL + `/progress/${data.progressId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
      body: JSON.stringify(data.progressData),
    });
    return await response.json();
  }
);
export const deleteEventProgress = createAsyncThunk(
  "deleteEventProgress",
  async (progressId) => {
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(BASE_URL + `/progress/${progressId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
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
    progress_data:null,
    isDeleteProgress:false,
    isEditProgress:false,
  },
  reducers: {
    setProgressList:(state,action)=>{
      state.progressList=action.payload;
    },
    setProgressValue:(state,action)=>{
      state.progress_data=action.payload;
    },
    setAddProgressStart:(state)=>{
      state.add_progress=true;
    },
    setAddProgressEnd:(state)=>{
      state.add_progress=false;
    },
    setDeleteProgressStart:(state)=>{
      state.isDeleteProgress=true;
    },
    setDeleteProgressEnd:(state)=>{
      state.isDeleteProgress=false;
    },
    setEditProgressStart:(state)=>{
      state.isEditProgress=true;
    },
    setEditProgressEnd:(state)=>{
      state.isEditProgress=false;
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
    builder.addCase(getProgressByEventAndProgress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProgressByEventAndProgress.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getProgressByEventAndProgress.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteEventProgress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteEventProgress.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteEventProgress.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateEventProgress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateEventProgress.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateEventProgress.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const progressAction=eventProgressSlice.actions;
export default eventProgressSlice.reducer;
