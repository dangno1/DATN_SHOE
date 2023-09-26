import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cartApi = createApi({
  reducerPath: 'carts',
  tagTypes: ['Carts'],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000`,
  }),
  endpoints: () => ({
    
  }),
});

export default cartApi;