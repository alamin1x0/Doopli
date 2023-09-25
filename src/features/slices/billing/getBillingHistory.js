import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getInfo } from "../../auth/login/loginApi"

const initialState = {
    billingHistory:[],
    loading: false,
    loadmore: false,
    isRefresh: false,
    nextPageUrl: ""
}

export const getBillingHistory=createAsyncThunk('billing/getBillingHistory',
async ({token, URL})=>{
    try{
        const response = await getInfo(token, URL);
        return response;
    }
    catch(err){}
}
)

export const getMoreBillingHistory=createAsyncThunk('billing/getMoreBillingHistory',
async ({token, nextPageUrl})=>{
    try{
        const response = await getInfo(token, nextPageUrl);
        return response;
    }
    catch(err){}
}
);

const billingSlice = createSlice({
    name: "billing",
    initialState,
    reducers: {
        resetBilling: (state,actions) => {
         state.loading=false;
         state.billingHistory= [];
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getBillingHistory.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(getBillingHistory.fulfilled,(state,{payload})=>{
            const {status,records}= payload?.response || {};
            if(status?.code == 200) {
                const {data, pagination} = records || {};
                state.billingHistory = data;
                state.nextPageUrl = pagination?.next_page_url;
            }
            state.loading = false;
        });
        builder.addCase(getBillingHistory.rejected,(state)=>{
            state.loading = false;
        });
        builder.addCase(getMoreBillingHistory.pending, (state)=>{
            state.loadmore = true;
        });
        builder.addCase(getMoreBillingHistory.fulfilled,(state,{payload})=>{
            const {status,records}= payload?.response || {};
            if(status?.code == 200) {
                const {data, pagination} = records || {};
                state.billingHistory = [...state.billingHistory,...data];
                state.nextPageUrl = pagination?.next_page_url;
            }
            state.loadmore = false;
        });
        builder.addCase(getMoreBillingHistory.rejected, (state)=>{
            state.loadmore = false;
        });
    }
})
export const {resetBilling} = billingSlice.actions;
export default billingSlice.reducer;