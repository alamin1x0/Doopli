import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import config from '../../../../config';
import { getInfo } from '../../auth/login/loginApi';

const initialState = {
  useCaseList: [],
  loading: false,
};

export const getuseCase = createAsyncThunk(
  'image/getuseCase',
  async obj => {
    const URL = `${config.BASE_URL}/user/openai/use-cases`;
    const {token} = obj;
    const response = await getInfo(token, URL);
    return response;
  },
);

const getuseCases = createSlice({
  name: 'useCases',
  initialState,
  extraReducers: builder => {
    builder.addCase(getuseCase.pending, state => {
      state.loading = true;
    });
    builder.addCase(getuseCase.fulfilled, (state, {payload}) => {
      const { status, records: {data, links } = {} } =
      payload.response || {};
      state.loading = false;
      state.useCaseList = data;
    });
    builder.addCase(getuseCase.rejected, state => {
      state.loading = false;
    });
  },
});

export default getuseCases.reducer;
