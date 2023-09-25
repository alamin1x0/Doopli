import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import config from "../../../../config"
import { getInfo } from "../../auth/login/loginApi";

const initialState={
    codeList : [],
    loading : false,
    loadMore : false,
    isRefresh: false,
    nextPageUrl: ""
}

export const getCodeHistory= createAsyncThunk('code/getCodeHistory',
async obj =>{
    const URL = `${config.BASE_URL}/user/openai/code/list`;
    const {token} = obj;
    const response = await getInfo(token, URL);
    return response;
}
)
export const getMoreCodeHistory= createAsyncThunk('code/getMoreCodeHistory',
async obj =>{
    const {token, nextPageUrl} = obj;
    const response = await getInfo(token, nextPageUrl);
    return response;
}
)

const getCodes = createSlice({
    name: 'codeHistory',
    initialState,
    extraReducers: builder =>{
        builder.addCase(getCodeHistory.pending, state=>{
            state.loading = true;
        })
        builder.addCase(getCodeHistory.fulfilled, (state, {payload})=>{
            const {status, records:{data, links}={}}= payload.response || {};
            state.loading= false;
            state.codeList = data;
            status.code === 200 ?
            state.nextPageUrl = links?.next:
            state.nextPageUrl="";
        })
        builder.addCase(getCodeHistory.rejected, state=>{
            state.loading = false;
        })
        builder.addCase(getMoreCodeHistory.pending, state => {
            state.loadMore = true;
          });
          builder.addCase(getMoreCodeHistory.fulfilled, (state, {payload}) => {
            const { status, records: { data,links } = {} } =
            payload.response || {};
            state.loadMore = false;
            state.codeList =[...state.codeList,...data];
            status.code === 200 ?
            state.nextPageUrl = links?.next:
            state.nextPageUrl="";
          });
          builder.addCase(getMoreCodeHistory.rejected, state => {
            state.loadMore = false;
          });
    }
})

export default getCodes.reducer;