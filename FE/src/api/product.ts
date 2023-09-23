import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "@/interface/product";
// import axios from "axios";

const productApi = createApi({
  reducerPath: "products",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api`,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => `/products`,
      providesTags: ["Product"],
    }),
    getProduct: builder.query<IProduct, number | string>({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    removeProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Product"],
    }),
    addProduct: builder.mutation<IProduct, IProduct>({
      query: (product) => {
        const data = new FormData();
        data.append("name", product.name);
        data.append("desc", product.desc);
        data.append("brand", product.brand);
        data.append("categoryId", product.categoryId);

        data.append("variants", JSON.stringify(product.variants));

        Array.from(product.image).forEach((file) => {
          data.append("image", file);
        });

        Array.from(product.images).forEach((file: any) => {
          data.append("images", file);
        });

        return {
          url: `/products`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `/products/${product._id}`,
        method: "PATCH",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export default productApi;
export const productReducer = productApi.reducer;
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
} = productApi;
