import { ICart } from "@/interface/cart";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cartApi = createApi({
  reducerPath: "carts",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),
  tagTypes: ["Carts"],
  endpoints: (builder) => ({
    getAllProductCarts: builder.query<{ data: ICart[] }, void>({
      query: () => "/cart",
      providesTags: ["Carts"],
    }),

    quantityPlus: builder.mutation<ICart, Partial<ICart>>({
      query: (cart) => ({
        url: `/cart/updatePlus/${cart._id}`,
        method: "PATCH",
        body: cart,
      }),
      invalidatesTags: ["Carts"],
    }),

    quantityMinus: builder.mutation<ICart, Partial<ICart>>({
      query: (cart) => ({
        url: `/cart/updateMinus/${cart._id}`,
        method: "PATCH",
        body: cart,
      }),
      invalidatesTags: ["Carts"],
    }),
    createCart: builder.mutation<ICart, Partial<ICart>>({
      query: (cart) => ({
        url: "/cart/add",
        method: "POST",
        body: cart,
      }),
      invalidatesTags: ["Carts"],
    }),
    deleteProductCart: builder.mutation<ICart, string>({
      query: (_id) => ({
        url: `/cart/delete/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Carts"],
    }),
  }),
});

export const {
  useDeleteProductCartMutation,
  useGetAllProductCartsQuery,
  useCreateCartMutation,
  useQuantityPlusMutation,
  useQuantityMinusMutation,
} = cartApi;
export const cartReducer = cartApi.reducer;
export default cartApi;
