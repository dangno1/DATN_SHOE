import { IComment } from '@/interface/comment';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const commentApi = createApi({
  reducerPath: 'comments',
  tagTypes: ['Comments'],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api`,
  }),
    endpoints: (builder) => ({
      getComments: builder.query<IComment[], void>({
        query: () => 'comments',
        providesTags: ['Comments'],
         // Điều chỉnh đường dẫn endpoint
      }),
      getComment: builder.query<IComment, number | string>({
        query: (id) => `comments/${id}`,
        providesTags: ['Comments']
         // Điều chỉnh đường dẫn endpoint
      }),
      createComment: builder.mutation({
        query: (commentData) => ({
          url: 'comments', // Điều chỉnh đường dẫn endpoint
          method: 'POST',
          body: commentData,
        }),
      }),
      deleteComment: builder.mutation({
        query: (id) => ({
          url: `comments/${id}`, // Điều chỉnh đường dẫn endpoint
          method: 'DELETE',
        }),
      
      }),
    }),
  });

export default commentApi;
export const commentReducer = commentApi.reducer;
export const {
  useGetCommentsQuery,
  useGetCommentQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
