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
      query: (id) => `/api/user/${id}`,
      providesTags: ["User"],
    }),

    signin: builder.mutation<
      {
        success: boolean;
        accessToken: string;
        user: {
          id: unknown;
          role: string;
        };
      },
      ISignin
    >({
      query: (credentials) => ({
        url: `/api/auth/signin`,
        method: "POST",
        body: credentials,
      }),
    }),

    signup: builder.mutation<
      {
        data: unknown;
        success: boolean;
        messages: [];
        user: { role: string };
      },
      IUser
    >({
      query: (user) => ({
        url: `/api/auth/signup`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    addUser: builder.mutation<
      {
        data: unknown;
        success: boolean;
        messages: [];
        user: { role: string };
      },
      IUser
    >({
      query: (user) => ({
        url: `/api/user/addUser`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation<
     IUser,
    IUser
    >({
      query: (user) => ({
        url: `/api/user/updateUser/${user._id}`,
        method: "PATCH",
        body: {...user,_id:undefined},
      }),
      invalidatesTags: ["User"],
    }),

    changePassword: builder.mutation<
     IUser,
    IUser
    >({
      query: (user) => ({
        url: `/api/user/changePassword/${user._id}`,
        method: "PATCH",
        body: {...user,_id:undefined},
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const {
  useGetUserQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useSigninMutation,
  useSignupMutation,
  useUpdateUserMutation,
  useChangePasswordMutation
} = userApi;
export const authReducer = userApi.reducer;
export default userApi;
