import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../interface/auth";
import { ISignin } from "../interface/signin";

const userApi = createApi({
  reducerPath: "users",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api/auth`,
  }),
  endpoints: (builder) => ({
    getUser: builder.query<IUser[], void>({
      query: () => `/users`,
      providesTags: ["User"],
    }),
    getUserById: builder.query<IUser, number | string>({
      query: (id) => `/user/${id}`,
      providesTags: ["User"],
    }),


    signin: builder.mutation<
      { accessToken: string; user: string },
      ISignin
    >({
      query: (credentials) => ({
        url: `/signin`,
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: '/user',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User']
    }),
  }),
});

export const {useGetUserQuery, useGetUserByIdQuery, useSigninMutation, useSignupMutation } =
  userApi;
export const authReducer = userApi.reducer;
export default userApi;
