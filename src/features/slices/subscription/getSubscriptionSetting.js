import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getInfo } from "../../auth/login/loginApi"

const initialState={
    subscriptionSetting: null,
    loading: false,
}

export const getSubscriptionSetting = createAsyncThunk(
    'subscription/getSubscriptionSetting',
    async ({token, URL})=>{
        try{
            const response = await getInfo(token, URL);
            return response;
        }
        catch (error){

        }
    }
)

const subscriptionSettingSlice = createSlice({
    name: 'subscription',
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(getSubscriptionSetting.pending, (state)=>{
            state.loading= true;
        });
        builder.addCase(getSubscriptionSetting.fulfilled, (state, {payload})=>{
            const {status, records}= payload?.response || {};
            status?.code == 200 ?
            state.subscriptionSetting= records :
            state.subscriptionSetting=null;
            state.loading=false;
        });
        builder.addCase(getSubscriptionSetting.rejected, (state)=>{
            state.loading=false;
        });
    }
})

export default subscriptionSettingSlice.reducer;