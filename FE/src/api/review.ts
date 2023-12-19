import IReview from "@/interface/review";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reviewApi = createApi({
  reducerPath: "reviews",
  tagTypes: ["Reviews"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),
  endpoints: (builder) => ({
    getAllReview: builder.query<IReview[], void>({
      query: () => `reviews`,
      providesTags: ["Reviews"],
    }),
    addReview: builder.mutation<IReview, IReview>({
      query: (review) => ({
        url: `reviews`,
        method: "POST",
        body: review,
      }),
    }),
  }),
});

export default reviewApi;
export const reviewReducer = reviewApi.reducer;
export const { useGetAllReviewQuery, useAddReviewMutation } = reviewApi;
