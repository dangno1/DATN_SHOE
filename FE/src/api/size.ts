import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISize } from "@/interface/size";

const sizeApi = createApi({
  reducerPath: "size",
  tagTypes: ["Size"],
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.adidas.id.vn/api`,
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
    removeSize: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/size/${id}`,
        method: "DELETE",
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
      query: (data) => {
        return {
          url: `/size/update/${data._id}`,
          method: "PATCH",
          body: { ...data, _id: undefined },
        };
      },
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
