import { ICart } from "@/interface/cart";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserResponse } from "../type/type";
import { IOrder } from "@/interface/order";

const orderedProductApi = createApi({
  reducerPath: "orderedProduct",
  tagTypes: ["OrderedProduct"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api`,
  }),
  endpoints: (builder) => ({
    orderedProduct: builder.mutation<void, void>({
      query: (orderProduct) => ({
        url: `/addOderProduct`,
        method: "POST",
        body: orderProduct,
      }),
      invalidatesTags: ["OrderedProduct"],
    }),
    getOrders: builder.query<IOrder[], void>({
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
        method: "POST",
        body: orderProduct,
      }),
      transformResponse: (response: { data: UserResponse }) => {
        return response.data;
      },
    }),
    updateOrderAdmin: builder.mutation<ICart, ICart>({
      query: (orderProduct) => {
        return {
          url: `/orderProductUpdate/${orderProduct._id}`,
          method: "PATCH",
          body: { ...orderProduct, _id: undefined },
        };
      },
      invalidatesTags: ["OrderedProduct"],
    }),
    sendEmail: builder.mutation<void, void>({
      query: (dataSend) => ({
        url: `/sendEmail`,
        method: "POST",
        body: dataSend,
      }),
      invalidatesTags: ["OrderedProduct"],
    }),

    updateQy: builder.mutation<void, void>({
      query: (orderProduct) => ({
        url: `/updateQuantity`,
        method: "POST",
        body: orderProduct,
      }),
      invalidatesTags: ["OrderedProduct"],
    }),
  }),
});

export default orderedProductApi;
export const orderedProductReducer = orderedProductApi.reducer;
export const {
  useOrderedProductMutation,
  useGetOrdersQuery,
  useUpdateorderMutation,
  useCheckoutMutation,
  useUpdateOrderAdminMutation,
  useSendEmailMutation,
  useUpdateQyMutation
} = orderedProductApi;
