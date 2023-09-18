import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../interface/auth";
import { ISignin } from "../interface/signin";

const userApi = createApi({
  reducerPath: "users",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000`,
  }),
  endpoints: (builder) => ({
    getUser: builder.query<IUser[], void>({
      query: () => `/api/users/`,
      providesTags: ["User"],
    }),
    getUserById: builder.query<IUser, number | string>({
      query: (id) => `/user/${id}`,
      providesTags: ["User"],
    }),



    signin: builder.mutation<
      {
        success: boolean;
        accessToken: string;
        user: { role: string };
      },
      ISignin
    >({
      query: (credentials) => ({
        url: `/api/auth/signin`,
        method: "POST",
        body: credentials,
      }),
    }),


    
    signup: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserByIdQuery,
  useSigninMutation,
  useSignupMutation,
} = userApi;
export const authReducer = userApi.reducer;
export default userApi;
