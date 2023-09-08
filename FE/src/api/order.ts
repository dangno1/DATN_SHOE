import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const orderApi = createApi({
  reducerPath: 'orders',
  tagTypes: ['Oredrs'],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000`,
  }),
  endpoints: () => ({
    
  }),
});

export default orderApi;