import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface IRate{
  stars: number,
  ProductId:string
  
  UserId:string
}
const ratingApi = createApi({
  reducerPath: "ratings",
  tagTypes: ['Rating'],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api", // Thay đổi URL base của API tương ứng
  }),
  endpoints: (builder) => ({
    getRate : builder.query<IRate[], void>({
      query: () => `ratings`, 
      providesTags: ['Rating'],
    }),
    rateProduct: builder.mutation({
      query: ( rating ) => ({
        url: `ratings`, // Đường dẫn API cho việc đánh giá sản phẩm
        method: "POST",
        body:  rating , // Dữ liệu gửi đi (rating)
      }),
    }),
  }),
});


export default ratingApi;
export const ratingReducer = ratingApi.reducer;
export const { useGetRateQuery,useRateProductMutation } = ratingApi;
