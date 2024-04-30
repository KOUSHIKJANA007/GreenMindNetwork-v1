import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, localStorageWithExpiry } from "./helper";

export const createNgo = createAsyncThunk("createNgo", async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(BASE_URL+`/api/ngo/register/${data.userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token
        },
        body: JSON.stringify(data.ngoData)
    })
    return await response.json();
})
export const updateNgo = createAsyncThunk("updateNgo", async (data) => {
  let token = localStorageWithExpiry.getItem("token");
  const response = await fetch(
    BASE_URL+`/api/ngo/edit/${data.ngoId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
      body: JSON.stringify(data.ngoData),
    }
  );
  return await response.json();
});
export const getAllNgos = createAsyncThunk("getAllNgos",async()=>{
    const response = await fetch(BASE_URL+`/api/ngo/`,{
        method:"GET",
        headers:{
            "Content-Type": "application/json",
        }
    })
    return await response.json();
})
export const getTotalNgo = createAsyncThunk("getTotalNgo", async () => {
  const response = await fetch(BASE_URL+`/api/ngo/length`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});
export const getSingleNgo = createAsyncThunk("getSingleNgo", async (ngoId) => {
  const response = await fetch(BASE_URL + `/api/ngo/${ngoId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});
export const getNgoByUser = createAsyncThunk("getNgoByUser",async(userId)=>{
    const response = await fetch(BASE_URL+`/api/ngo/user/${userId}`,{
        method:"GET",
        headers:{
            "Content-Type": "application/json",
        }
    })
    return await response.json();
})
export const uploadNgoLogo = createAsyncThunk("uploadNgoLogo", async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    let formData = new FormData();
    formData.append("image",data.logo);
    const response = await fetch(BASE_URL+`/api/ngo/image/ngoLogo/${data.ngoId}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer" + token
        },
        body: formData
    })
    return await response.json();
})
export const uploadIdentityProof = createAsyncThunk("uploadIdentityProof", async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    let formData = new FormData();
    formData.append("image", data.identityOfHead);
    const response = await fetch(BASE_URL+`/api/ngo/image/uploadIdentity/${data.ngoId}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer" + token
        },
        body: formData
    })
    return await response.json();
})
export const uploadTaxProof = createAsyncThunk("uploadTaxProof", async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    let formData = new FormData();
    formData.append("image", data.imageOfTax);
    const response = await fetch(BASE_URL+`/api/ngo/image/TaxProof/${data.ngoId}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer" + token
        },
        body: formData
    })
    return await response.json();
})
export const uploadRegistrationProof = createAsyncThunk("uploadRegistrationProof", async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    let formData = new FormData();
    formData.append("image", data.registerImage);
    const response = await fetch(BASE_URL+`/api/ngo/image/RegistrationProof/${data.ngoId}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer" + token
        },
        body: formData
    })
    return await response.json();
})
const ngoDetails = createSlice({
    name: "ngoDetails",
    initialState: {
        loading: false,
        ngoData:null,
        isFetch:false,
        userNgo:null,
        singleNgo:null,
        isEdit:false,
        total_ngo:'0',
    },
    reducers: {
        setNgoData:(state,action)=>{
            state.ngoData=action.payload;
        },
        setTotalNgo:(state,action)=>{
            state.total_ngo=action.payload;
        },
        setUserNgoData:(state,action)=>{
            state.userNgo=action.payload;
        },
        setSingleNgoData:(state,action)=>{
            state.singleNgo=action.payload;
        },
        setFetchDone:(state)=>{
            state.isFetch=true;
        },
        setFetchEnd:(state)=>{
            state.isFetch=false;
        },
        setEditDone:(state)=>{
            state.isEdit=true;
        },
        setEditEnd:(state)=>{
            state.isEdit=false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createNgo.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(createNgo.fulfilled,(state,action)=>{
            state.loading=false;
        })
        builder.addCase(createNgo.rejected,(state,action)=>{
            state.loading=false;
        })
        builder.addCase(uploadNgoLogo.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(uploadNgoLogo.fulfilled,(state,action)=>{
            state.loading=false;
        })
        builder.addCase(uploadNgoLogo.rejected,(state,action)=>{
            state.loading=false;
        })
        builder.addCase(uploadIdentityProof.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(uploadIdentityProof.fulfilled,(state,action)=>{
            state.loading=false;
        })
        builder.addCase(uploadIdentityProof.rejected,(state,action)=>{
            state.loading=false;
        })
        builder.addCase(uploadTaxProof.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(uploadTaxProof.fulfilled,(state,action)=>{
            state.loading=false;
        })
        builder.addCase(uploadTaxProof.rejected,(state,action)=>{
            state.loading=false;
        })
        builder.addCase(uploadRegistrationProof.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(uploadRegistrationProof.fulfilled,(state,action)=>{
            state.loading=false;
        })
        builder.addCase(uploadRegistrationProof.rejected,(state,action)=>{
            state.loading=false;
        })
        builder.addCase(getNgoByUser.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(getNgoByUser.fulfilled,(state,action)=>{
            state.loading=false;
        })
        builder.addCase(getNgoByUser.rejected,(state,action)=>{
            state.loading=false;
        })
        builder.addCase(getSingleNgo.pending, (state, action) => {
          state.loading = true;
        });
        builder.addCase(getSingleNgo.fulfilled, (state, action) => {
          state.loading = false;
        });
        builder.addCase(getSingleNgo.rejected, (state, action) => {
          state.loading = false;
        });
        builder.addCase(updateNgo.pending, (state, action) => {
          state.loading = true;
        });
        builder.addCase(updateNgo.fulfilled, (state, action) => {
          state.loading = false;
        });
        builder.addCase(updateNgo.rejected, (state, action) => {
          state.loading = false;
        });
        builder.addCase(getTotalNgo.pending, (state, action) => {
        //   state.loading = true;
        });
        builder.addCase(getTotalNgo.fulfilled, (state, action) => {
        //   state.loading = false;
        });
        builder.addCase(getTotalNgo.rejected, (state, action) => {
        //   state.loading = false;
        });
    }
})

export const ngoAction=ngoDetails.actions;
export default ngoDetails.reducer;