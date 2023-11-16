import { ICoupons } from "@/interface/coupons";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const couponsApi = createApi({
  reducerPath: "coupons",
  tagTypes: ["Coupons"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api`,
  }),
  endpoints: (builder) => ({
    getAllCoupons: builder.query<ICoupons[], void>({
      query: () => `/coupons`,
      providesTags: ["Coupons"],
    }),
    getCoupons: builder.query<ICoupons, number | string>({
      query: (id) => `/coupons/${id}`,
      providesTags: ["Coupons"],
    }),
    removeCoupons: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupons"],
    }),
    addCoupons: builder.mutation<ICoupons, ICoupons>({
      query: (coupons) => ({
        url: `/coupons`,
        method: "post",
        body: coupons,
      }),
      invalidatesTags: ["Coupons"],
    }),
    updateCoupons: builder.mutation<ICoupons, ICoupons>({
      query: (coupons) => {
        return {
          url: `/coupons/update/${coupons._id}`,
          method: "PATCH",
          body: { ...coupons, _id: undefined },
        };
      },
      invalidatesTags: ["Coupons"],
    }),
  }),
});

export default couponsApi;
export const couponsReducer = couponsApi.reducer;
export const {
  useGetAllCouponsQuery,
  useGetCouponsQuery,
  useAddCouponsMutation,
  useUpdateCouponsMutation,
  useRemoveCouponsMutation,
} = couponsApi;
