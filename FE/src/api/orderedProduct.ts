import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const orderedProductApi = createApi({
  reducerPath: 'orderedProduct',
  tagTypes: ['OrderedProduct'],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api`,
  }),
  endpoints: (builder) => ({
    orderedProduct: builder.mutation<void, void>({
      query: (orderProduct) => ({
        url: `/addOderProduct`,
        method: 'POST',
        body: orderProduct
      }),
      invalidatesTags: ["OrderedProduct"]
    })
  }),
});

export default orderedProductApi;
export const orderedProductReducer = orderedProductApi.reducer;
export const { useOrderedProductMutation } = orderedProductApi;
