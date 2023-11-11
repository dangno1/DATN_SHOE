import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IColor } from "@/interface/color";
import { IColorExtend } from "@/features/color/components/list";

const colorApi = createApi({
  reducerPath: "colors",
  tagTypes: ["Color"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api`,
  }),
  endpoints: (builder) => ({
    getColors: builder.query<IColor[], void>({
      query: () => `/color`,
      providesTags: ["Color"],
    }),
    getColor: builder.query<IColor, number | string>({
      query: (id) => `/color/${id}`,
      providesTags: ["Color"],
    }),
    removeColor: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/color/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Color"],
    }),
    addColor: builder.mutation<IColor, IColorExtend>({
      query: (color) => ({
        url: `/color`,
        method: "post",
        body: color,
      }),
      invalidatesTags: ["Color"],
    }),
    updateColor: builder.mutation<IColor, IColorExtend>({
      query: (color) => ({
        url: `/color/update/${color._id}`,
        method: "PATCH",
        body: { ...color, _id: undefined },
      }),
      invalidatesTags: ["Color"],
    }),
  }),
});

export default colorApi;
export const colorReducer = colorApi.reducer;
export const {
  useGetColorsQuery,
  useGetColorQuery,
  useAddColorMutation,
  useUpdateColorMutation,
  useRemoveColorMutation,
} = colorApi;
