import { ICart } from '@/interface/cart';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserResponse } from "../type/type";

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
    }),
    getOrders: builder.query<void, void>({
      query: () => `/orderProducts`,
      providesTags: ["OrderedProduct"],
    }),
    updateorder: builder.mutation<ICart, ICart>({
      query: (orderProduct) => {
        return {
          url: `/orderProducts/${orderProduct._id}`,
          method: "PATCH",
          body: { ...orderProduct, _id: undefined },
        };
      },
      invalidatesTags: ["OrderedProduct"],
    }),
    checkout: builder.mutation<UserResponse, void>({
      query: (orderProduct) => ({
        url: `/checkout`,
        method: 'POST',
        body: orderProduct,
        
      }),
      transformResponse: (response: { data: UserResponse }) => {
        return response.data
      },
    }),
  }),
});

export default orderedProductApi;
export const orderedProductReducer = orderedProductApi.reducer;
export const { useOrderedProductMutation, useGetOrdersQuery, useUpdateorderMutation, useCheckoutMutation } = orderedProductApi;
