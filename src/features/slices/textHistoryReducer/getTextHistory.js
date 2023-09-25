import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import config from '../../../../config';
import { getInfo } from '../../auth/login/loginApi';

const initialState = {
  contentList: [],
  loading: false,
  isRefresh: false,
  nextPageUrl: "",
  loadMore: false,
};

export const getTextHistory = createAsyncThunk(
  'text/getTextHistory',
  async obj => {
    const URL = `${config.BASE_URL}/user/openai/content/list`;
    const {token} = obj;
    const response = await getInfo(token, URL);
    return response;
  },
);
export const getMoreTextHistory = createAsyncThunk(
  'text/getMoreTextHistory',
  async obj => {
    const {token,nextPageUrl} = obj;
    const response = await getInfo(token, nextPageUrl);
    return response;
  },
);

const getImages = createSlice({
  name: 'imageHistory',
  initialState,
  extraReducers: builder => {
    builder.addCase(getTextHistory.pending, state => {
      state.loading = true;
    });
    builder.addCase(getTextHistory.fulfilled, (state, {payload}) => {
      const { status, records: {data, links } = {} } =
      payload.response || {};
      state.loading = false;
      state.contentList = data;
      if (status?.code == 200) {
        state.nextPageUrl = links?.next;
    }
    });
    builder.addCase(getTextHistory.rejected, state => {
      state.loading = false;
    });
    builder.addCase(getMoreTextHistory.pending, state => {
      state.loadMore = true;
    });
    builder.addCase(getMoreTextHistory.fulfilled, (state, {payload}) => {
      const { status, records: { data,links } = {} } =
      payload.response || {};
      state.loadMore = false;
      state.contentList =[...state.contentList,...data];
      if (status?.code == 200) {
        state.nextPageUrl = links?.next;
    }
    });
    builder.addCase(getMoreTextHistory.rejected, state => {
      state.loadMore = false;
    });
  },
});

export default getImages.reducer;
