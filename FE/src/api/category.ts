import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategory } from "@/interface/category";

const categoryApi = createApi({
  reducerPath: "categoryes",
  tagTypes: ["Category"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api`,
  }),
  endpoints: (builder) => ({
    getCategoryes: builder.query<ICategory[], void>({
      query: () => `/categoryes`,
      providesTags: ["Category"],
    }),
    getCategory: builder.query<ICategory, number | string>({
      query: (id) => `/categoryes/${id}`,
      providesTags: ["Category"],
    }),
    removeCategory: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/categoryes/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Category"],
    }),
    addCategory: builder.mutation<ICategory, ICategory>({
      query: (category: ICategory) => ({
        url: `/categoryes`,
        method: "post",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<ICategory, ICategory>({
      query: (category: ICategory) => ({
        url: `/categoryes/update/${category._id}`,
        method: "PATCH",
        body: { ...category, _id: undefined },
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export default categoryApi;
export const categoryReducer = categoryApi.reducer;
export const {
  useGetCategoryesQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useRemoveCategoryMutation,
} = categoryApi;
