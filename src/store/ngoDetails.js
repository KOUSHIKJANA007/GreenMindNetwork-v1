import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localStorageWithExpiry } from "./helper";

export const createNgo = createAsyncThunk("createNgo", async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(`http://localhost:8080/api/ngo/register/${data.userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token
        },
        body: JSON.stringify(data.ngoData)
    })
    return await response.json();
})
export const getAllNgos = createAsyncThunk("getAllNgos",async()=>{
    const response = await fetch("http://localhost:8080/api/ngo/",{
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
    const response = await fetch(`http://localhost:8080/api/ngo/image/ngoLogo/${data.ngoId}`, {
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
    const response = await fetch(`http://localhost:8080/api/ngo/image/uploadIdentity/${data.ngoId}`, {
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
    const response = await fetch(`http://localhost:8080/api/ngo/image/TaxProof/${data.ngoId}`, {
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
    const response = await fetch(`http://localhost:8080/api/ngo/image/RegistrationProof/${data.ngoId}`, {
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
        isFetch:false
    },
    reducers: {
        setNgoData:(state,action)=>{
            state.ngoData=action.payload;
        },
        setFetchDone:(state)=>{
            state.isFetch=true;
        },
        setFetchEnd:(state)=>{
            state.isFetch=false;
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
    }
})

export const ngoAction=ngoDetails.actions;
export default ngoDetails.reducer;