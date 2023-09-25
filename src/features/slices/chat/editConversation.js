import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postInfo } from "../../auth/login/loginApi";

const initialState = {
    message: undefined,
    isLoading: false,
}

export const editConversation = createAsyncThunk(
    "chat/editConversation",
    async ({data, token, url}) => {
        try {
            const response = await postInfo(data, url, token, 'POST');
            return response;
        } catch (error) {
            
        }
    }
);

const editConversationSlice = createSlice({
    name: "editConversation",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(editConversation.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(editConversation.fulfilled, (state, {payload}) => {
            const {code,message} = payload?.response?.status || {};
            if(code == 200) {
                state.message = message
            };
            state.isLoading = false
        });
        builder.addCase(editConversation.rejected, (state) => {
            state.isLoading = false
        });
    }
});

export default editConversationSlice.reducer