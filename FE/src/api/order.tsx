import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOrder } from '../interface/order'; 

const orderApi = createApi({
  reducerPath: 'orders',
  tagTypes: ['Orders'],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000`,
  }),
  
  endpoints: (builder) => ({
    getOrders: builder.query<IOrder[], void>({
      query: () => `/orders`,
      providesTags: ['Orders']
  }),
  getOrderById: builder.query<IOrder, number| string> ({
    query: (id) => `/orders/${id}`,
    providesTags: ['Orders']
  }),
  removeOrder: builder.mutation<void, number | string>({
    query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
    }),
    invalidatesTags: ['Orders']
}),
createOrder: builder.mutation<IOrder, IOrder>({
  query: (order) => ({
      url: `/orders`,
      method: "POST",
      body: order
  }),
  invalidatesTags: ['Orders']
}),
  }),
});
export const {
  useGetOrdersQuery, 
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useRemoveOrderMutation} = orderApi;

export const orderReducer = orderApi.reducer;

export default orderApi;