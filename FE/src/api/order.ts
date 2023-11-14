import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOrder } from '../interface/order';

const orderApi = createApi({
  reducerPath: 'orders',
  tagTypes: ['Orders'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api', 
  }),
  endpoints: (builder) => ({
    getOrders: builder.query<IOrder[], void>({
      query: () => '/ordersProducts', 
      providesTags: ['Orders'],
    }),
    
    }),
});

export const {
  useGetOrdersQuery
} = orderApi;

export const orderReducer = orderApi.reducer;

export default orderApi;
