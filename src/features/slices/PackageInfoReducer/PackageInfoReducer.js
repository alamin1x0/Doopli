import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import config from '../../../../config';
import {getInfo} from '../../auth/login/loginApi';

const initialState = {
  packageInfo: {},
  loading: false,
};

export const getPackageInfo = createAsyncThunk(
  'package/getAllPackage',
  async obj => {
    const URL = `${config.BASE_URL}/user/openai/package-info`;
    const {token} = obj;
    const response = await getInfo(token, URL);
    return response;
  },
);

const packageInfo = createSlice({
  name: 'package',
  initialState,
  extraReducers: builder => {
    builder.addCase(getPackageInfo.pending, state => {
      state.loading = true;
    });
    builder.addCase(getPackageInfo.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.packageInfo = payload?.response?.records;
    });
    builder.addCase(getPackageInfo.rejected, state => {
      state.loading = false;
    });
  },
});
export default packageInfo.reducer;
