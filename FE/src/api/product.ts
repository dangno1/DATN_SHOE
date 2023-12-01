/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "@/interface/product";

const productApi = createApi({
  reducerPath: "products",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api`,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void | boolean>({
      query: (trashcan) => `/products?trashcan=${trashcan}`,
      providesTags: ["Product"],
    }),
    getProduct: builder.query<IProduct, number | string>({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    removeProduct: builder.mutation<void, number | string>({
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

        product.image.forEach((file: File) => {
          data.append("image", file);
        });

        product.thumbnail.forEach((file: File) => {
          data.append("thumbnail", file);
        });

        return {
          url: `/products`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<IProduct, any>({
      query: (product) => {
        const data = new FormData();
        data.append("name", product.name);
        data.append("desc", product.desc);
        data.append("brand", product.brand);
        data.append("categoryId", product.categoryId);
        data.append("isDelete", JSON.stringify(product.isDelete));

        data.append("variants", JSON.stringify(product.variants));

        product.image &&
          product.image.forEach((file: File) => {
            data.append("image", file);
          });

        product.thumbnail &&
          product.thumbnail.forEach((file: File) => {
            data.append("thumbnail", file);
          });

        return {
          url: `/products/update/${product._id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Product"],
    }),
    removeThumbnail: builder.mutation<
      void,
      {
        id: number | string;
        publicId: number | string;
      }
    >({
      query: (params) => ({
        url: `/products/thumbnail/${params.id}/${params.publicId}`,
        method: "delete",
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
  useRemoveThumbnailMutation,
} = productApi;
