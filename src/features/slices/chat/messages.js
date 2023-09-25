import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import uuid from 'react-native-uuid';
import { getInfo, postInfo } from "../../auth/login/loginApi";

const initialState = {
    messages: [],
    initialLoading: false,
    loading: false,
    next_page_url: null,
    loadMore: false
};

export const getMessages = createAsyncThunk(
    'chat/getMessage',
    async ({url, token}) => {
        try {
            const response = await getInfo(token, url);
            return response;
        } catch (error) {
            
        }
    }
);

export const getMoreMessages = createAsyncThunk(
    'chat/getMoreMessage',
    async ({url, token}) => {
        try {
            const response = await getInfo(token, url);
            return response;
        } catch (error) {
            
        }
    }
);

export const postMessage = createAsyncThunk(
    'chat/postMessage',
    async ({url, access_token, data}) => {
        try {
            const response = await postInfo(data, url, access_token, 'POST');
            return response;
        } catch (error) {
            
        }
    }
);

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.messages = [],
            state.loading = false,
            state.next_page_url = null,
            state.loadMore = false
        },
        storeMessage: (state, { payload }) => {
            let newData = {
                id: payload?.chatId ? payload?.chatId : uuid.v4(),
                user_message: payload?.promt
            }
            state.messages = [newData, ...state.messages];
        },
    },
    extraReducers: (builder) => {
        // get messages
        builder.addCase(getMessages.pending, (state) => {
            state.initialLoading = true
        });
        builder.addCase(getMessages.fulfilled, (state,  {payload}) => {
            const {status, records} = payload?.response || {};
            if(status?.code == 200) {
                const {data, pagination} = records || {};
                state.messages = data;
                state.next_page_url = pagination?.next_page_url;
            }
            state.initialLoading = false
        });
        builder.addCase(getMessages.rejected, (state) => {
            state.initialLoading = false
        })

        // get more messages
        builder.addCase(getMoreMessages.pending, (state) => {
            state.loadMore = true
        });
        builder.addCase(getMoreMessages.fulfilled, (state,  {payload}) => {
            const {status, records} = payload?.response || {};
            if(status?.code == 200) {
                const {data, pagination} = records || {};
                state.messages = [...state.messages, ...data];
                state.next_page_url = pagination?.next_page_url;
            }
            state.loadMore = false
        });
        builder.addCase(getMoreMessages.rejected, (state) => {
            state.loadMore = false
        })

        // post message
        builder.addCase(postMessage.pending, (state) => {
            state.loading = true
        });
        builder.addCase(postMessage.fulfilled, (state,  {payload}) => {
            const {status, records} = payload?.response || {};
            if(status?.code == 200) {
                const processData = processMessage(records);
                state.messages = [processData, ...state.messages];
            } else {
                // state.messages.shift()
            }
            state.loading = false
        });
        builder.addCase(postMessage.rejected, (state) => {
            state.loading = false
        })
    }
});

export const { resetMessage, storeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;


const processMessage = (data) => {
    let newData = {
        id: uuid.v4(),
        bot_message: data?.apiResponse?.choices[0]?.message?.content,
    }
    return newData
}