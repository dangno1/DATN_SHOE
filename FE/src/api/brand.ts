import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBrand } from "@/interface/brand";

const brandApi = createApi({
  reducerPath: "brand",
  tagTypes: ["Brand"],
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.adidas.id.vn/api`,
  }),
  endpoints: (builder) => ({
    getBrands: builder.query<IBrand[], void>({
      query: () => `/brand`,
      providesTags: ["Brand"],
    }),
    getBrand: builder.query<IBrand, number | string>({
      query: (id) => `/brand/${id}`,
      providesTags: ["Brand"],
    }),
    removeBrand: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Brand"],
    }),
    addBrand: builder.mutation<IBrand, IBrand>({
      query: (brand: IBrand) => ({
        url: `/brand`,
        method: "post",
        body: brand,
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrand: builder.mutation<IBrand, IBrand>({
      query: (brand: IBrand) => ({
        url: `/brand/update/${brand._id}`,
        method: "PATCH",
        body: { ...brand, _id: undefined },
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export default brandApi;
export const brandReducer = brandApi.reducer;
export const {
  useGetBrandsQuery,
  useGetBrandQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useRemoveBrandMutation,
} = brandApi;
