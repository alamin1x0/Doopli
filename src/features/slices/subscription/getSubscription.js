import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getInfo } from "../../auth/login/loginApi"

const initialState={
    subscriptionInfo: null,
    loading: false,
}

export const getSubscription = createAsyncThunk(
    'subscription/getSubscription',
    async ({token, URL})=>{
        try{
            const response = await getInfo(token, URL);
            return response;
        }
        catch (error){

        }
    }
)

const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        resetSubscripton: (state, actions) => {
          state.subscriptionInfo = null;
          state.loading = false;
        },
      },
    extraReducers: (builder)=>{
        builder.addCase(getSubscription.pending, (state)=>{
            state.loading= true;
        });
        builder.addCase(getSubscription.fulfilled, (state, {payload})=>{
            const {status, records}= payload?.response || {};
            status?.code == 200 ?
            state.subscriptionInfo= records :
            state.subscriptionInfo=null;
            state.loading=false;
        });
        builder.addCase(getSubscription.rejected, (state)=>{
            state.loading=false;
        });
    }
})

export const {resetSubscripton} = subscriptionSlice.actions;
export default subscriptionSlice.reducer;