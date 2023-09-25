import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postInfo } from "../../auth/login/loginApi";

const initialState = {
    message: undefined,
    isLoading: false,
}

export const deleteConversation = createAsyncThunk(
    "chat/deleteConversation", 
    async ({data, token, url}) => {
        try {
            const response = await postInfo(data, url, token, 'POST');
            return response;
        } catch (error) {
            
        }
    }
);

const deleteConversationSlice = createSlice({
    name: 'deleteConversation',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(deleteConversation.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(deleteConversation.fulfilled, (state, {payload}) => {
            const {code,message} = payload?.response?.status || {};
            if(code == 200) {
                state.message = message
            };
            state.isLoading = false
        });
        builder.addCase(deleteConversation.rejected, (state, {payload}) => {
            state.isLoading = false
        })
    }
});

export default deleteConversationSlice.reducer;