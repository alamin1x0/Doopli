import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getInfo } from "../../auth/login/loginApi"

const initialState={
    currentSubscription: null,
    loading: false,
}

export const getCurrentSubscription = createAsyncThunk(
    'subscription/getCurrentSubscription',
    async ({token, URL})=>{
        try{
            const response = await getInfo(token, URL);
            return response;
        }
        catch (error){

        }
    }
)

const currentSubscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(getCurrentSubscription.pending, (state)=>{
            state.loading= true;
        });
        builder.addCase(getCurrentSubscription.fulfilled, (state, {payload})=>{
            const {status, records}= payload?.response || {};
            status?.code == 200 ?
            state.currentSubscription= records?.data :
            state.currentSubscription=null;
            state.loading=false;
        });
        builder.addCase(getCurrentSubscription.rejected, (state)=>{
            state.loading=false;
        });
    }
})

export default currentSubscriptionSlice.reducer;