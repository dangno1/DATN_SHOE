import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISize } from "@/interface/size";

const sizeApi = createApi({
  reducerPath: "sizes",
  tagTypes: ["Size"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api`,
  }),
  endpoints: (builder) => ({
    getSizes: builder.query<ISize[], void>({
      query: () => `/size`,
      providesTags: ["Size"],
    }),
    getSize: builder.query<ISize, number | string>({
      query: (id) => `/size/${id}`,
      providesTags: ["Size"],
    }),
    removeSize: builder.mutation<void, number>({
      query: (id) => ({
        url: `/size/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Size"],
    }),
    addSize: builder.mutation<ISize, ISize>({
      query: (size) => ({
        url: `/size`,
        method: "post",
        body: size,
      }),
      invalidatesTags: ["Size"],
    }),
    updateSize: builder.mutation<ISize, ISize>({
      query: (size) => ({
        url: `/size/${size._id}`,
        method: "PATCH",
        body: size,
      }),
      invalidatesTags: ["Size"],
    }),
  }),
});

export default sizeApi;
export const sizeReducer = sizeApi.reducer;
export const {
  useGetSizesQuery,
  useGetSizeQuery,
  useAddSizeMutation,
  useUpdateSizeMutation,
  useRemoveSizeMutation,
} = sizeApi;
