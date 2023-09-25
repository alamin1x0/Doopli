import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getInfo } from "../../auth/login/loginApi";

const initialState={
    allSubscriptionsPlans: [],
    plansloader: false,
    max_price: 0
}

export const getAllSubscriptionsPlans=createAsyncThunk('subscriptionsPlans/getAllSubscriptionsPlans',
    async ({token, URL}) =>{
        try{
            const response = await getInfo(token, URL);
            return response;
        }
        catch (error){

        }
    }
)

const subscriptionSlice = createSlice({
    name: 'subscriptionsPlans',
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(getAllSubscriptionsPlans.pending, (state)=>{
            state.plansloader = true;
        });
        builder.addCase(getAllSubscriptionsPlans.fulfilled,(state, {payload})=>{
            const {status, records} = payload?.response || {};
            if(status?.code === 200){
                const {data, pagination} = records;
                let activePlan=[];
                let max = parseFloat(data[0].sale_price.replace(/[^0-9.-]+/g, ''))
                data.forEach(item=> {
                    if(item.status=='Active'){
                        activePlan.push(item);
                        if(parseFloat(item.sale_price.replace(/[^0-9.-]+/g, ''))> max){
                            max=parseFloat(item.sale_price.replace(/[^0-9.-]+/g, ''));
                        }
                    }
                })
                
                state.max_price= max;
                state.allSubscriptionsPlans= activePlan;
                state.plansloader= false
            }
        });
        builder.addCase(getAllSubscriptionsPlans.rejected, (state)=>{
                state.plansloader= false;
        })
    }
})

export default subscriptionSlice.reducer;
