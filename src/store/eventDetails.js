import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localStorageWithExpiry } from "./helper";

export const createEvent = createAsyncThunk("createEvent", async (data) => {
  let token = localStorageWithExpiry.getItem("token");
  const response = await fetch(`http://localhost:8080/api/event/${data.ngoId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + token,
    },
    body: JSON.stringify(data.eventData),
  });
  return await response.json();
});
export const updateEvent = createAsyncThunk("updateEvent", async (data) => {
  let token = localStorageWithExpiry.getItem("token");
  const response = await fetch(
    `http://localhost:8080/api/event/${data.eventId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
      body: JSON.stringify(data.eventData),
    }
  );
  return await response.json();
});
export const uploadEventImage = createAsyncThunk("uploadEventImage", async (data) => {
  let token = localStorageWithExpiry.getItem("token");
  let formData=new FormData();
  formData.append("image",data.image);
  const response = await fetch(
    `http://localhost:8080/api/event/image/${data.eventId}`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer" + token,
      },
      body: formData,
    }
  );
  return await response.json();
});
export const getEventByNgo = createAsyncThunk("getEventByNgo", async (ngoId) => {
     const response = await fetch(`http://localhost:8080/api/event/ngo/${ngoId}`,{
         method: "GET",
         headers: {
           "Content-Type": "application/json",
         },
       });
       return await response.json();
});
export const getEventById = createAsyncThunk("getEventById", async (eventId) => {
  const response = await fetch(
    `http://localhost:8080/api/event/${eventId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
});
export const getAllEvent = createAsyncThunk("getAllEvent", async () => {
  const response = await fetch(`http://localhost:8080/api/event/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});
export const deleteEvent = createAsyncThunk("deleteEvent", async (eventId) => {
   let token = localStorageWithExpiry.getItem("token");
  const response = await fetch(`http://localhost:8080/api/event/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + token,
    },
  });
  return await response.json();
});


const eventDetails = createSlice({
  name: "eventDetails",
  initialState: {
    loading: false,
    events:null,
    isDelete:false
  },
  reducers: {
    setEvent:(state,action)=>{
        state.events=action.payload;
    },
    setDeletePending:(state)=>{
      state.isDelete=true;
    },
    setDeleteDone:(state)=>{
      state.isDelete=false;
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
    builder.addCase(updateEvent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateEvent.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(uploadEventImage.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(uploadEventImage.fulfilled, (state, action) => {
      state.loading = false;
    })
    builder.addCase(uploadEventImage.rejected, (state, action) => {
      state.loading = false;
    })
    builder.addCase(getAllEvent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllEvent.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getAllEvent.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteEvent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getEventById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getEventById.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getEventById.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export const eventAction=eventDetails.actions;
export default eventDetails.reducer;
