import { api } from "../api";

export interface Review {
  id: number;
  text: string;
  rating: number;
  isApproved: boolean;
  createdAt: string;

  userId: number;

  user: {
    name: string;
    avatarUrl?: string | null;
  };

  serviceId: number;
  service?: {
    title: string;
  };
}

export interface CreateReviewDto {
  text: string;
  rating: number;
  serviceId: number;
}

export const reviewsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        //read
        getApprovedReviews: builder.query<Review[], number | void>({
            query: (serviceId) => serviceId
                ? `/reviews/service/${serviceId}`
                : '/reviews?status=approved',
            providesTags: ['Reviews'],
        }),

        getAllReviews: builder.query<Review[], void>({
            query: () => '/reviews/admin/all',
            providesTags: ['Reviews'],
        }),
        //write
        createReview: builder.mutation<Review, CreateReviewDto>({
            query: (body) => ({
                url: '/reviews',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Reviews'],
        }),

        updateReviewStatus: builder.mutation<Review, { id: number; isApproved: boolean }>({
            query: ({ id, isApproved }) => ({
                url: `/reviews/${id}/status`,
                method: 'PATCH',
                body: { isApproved },
            }),
            invalidatesTags: ['Reviews']
        }),

        deleteReview: builder.mutation<void, number>({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Reviews'],
        }),

        approveReview: builder.mutation<void, number>({
            query: (id) => ({
                url: `/reviews/${id}/approve`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Reviews'],
        }),
    }),
});

export const {
  useGetApprovedReviewsQuery,
  useGetAllReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewStatusMutation,
  useDeleteReviewMutation,
  useApproveReviewMutation,
} = reviewsApi;