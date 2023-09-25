import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import config from '../../../config';

export const apiSlice = createApi({
  reducerPath: 'openAi_api',
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
  }),
  endpoints: builder => ({}),
});
