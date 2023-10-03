import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const cartApi = createApi({
  reducerPath: 'carts',
  tagTypes: ['Carts'],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api`,
  }),
  endpoints: (builder) => ({
    getAllProductCarts: builder.query<any, void> ({
      query: () => "/cart",
      providesTags: ['Carts']
    }),
  }),
});

export const { useGetAllProductCartsQuery } = cartApi;
export const cartReducer = cartApi.reducer;
export default cartApi;