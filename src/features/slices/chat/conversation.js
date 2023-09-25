import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInfo } from "../../auth/login/loginApi";



const initialState = {
    conversation: [],
    loading: false,
    next_page_url: null,
    loadMore: false
};

export const getConversations = createAsyncThunk(
    'chat/conversation', 
    async ({token, url}) => {
        try {
            const response = await getInfo(token, url);
            return response;
        } catch (error) {
            
        }
    }
);
export const getMoreConversations = createAsyncThunk(
    'chat/moreConversation', 
    async ({token, url}) => {
        try {
            const response = await getInfo(token, url);
            return response;
        } catch (error) {
            
        }
    }
);

const conversationsSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        editConversationFromFront: (state, {payload}) => {
            const editableConversation = state.conversation.find(item => item?.id == payload.chatId);
            const index = state.conversation.indexOf(editableConversation);
            let restConversation = state.conversation.filter(item => item?.id != payload.chatId);
            if(editableConversation?.id) {
                editableConversation.title = payload?.name;
                restConversation.splice(index, 0, editableConversation);
                state.conversation = restConversation;
            }
        },
        deleteConversationFromFront: (state, {payload}) => {
            const restConversation = state.conversation.filter(item => item?.id != payload);
            state.conversation = restConversation;
        },
        resetConversation: (state) => {
            state.conversation = [],
            state.loading = false,
            state.next_page_url = null,
            state.loadMore = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getConversations.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getConversations.fulfilled, (state, {payload}) => {
            const {status, records} = payload?.response || {};
            if(status?.code == 200) {
                const {data, pagination} = records || {};
                state.conversation = data;
                state.next_page_url = pagination?.next_page_url
            }
            state.loading = false
        });
        builder.addCase(getConversations.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(getMoreConversations.pending, (state) => {
            state.loadMore = true
        });
        builder.addCase(getMoreConversations.fulfilled, (state, {payload}) => {
            const {status, records} = payload?.response || {};
            if(status?.code == 200) {
                const {data, pagination} = records || {};
                state.conversation = [...state.conversation, ...data];
                state.next_page_url = pagination?.next_page_url
            }
            state.loadMore = false
        });
        builder.addCase(getMoreConversations.rejected, (state) => {
            state.loadMore = false
        });
    }
});

export const {editConversationFromFront, deleteConversationFromFront, resetConversation} = conversationsSlice.actions;
export default conversationsSlice.reducer;

