import { Recommendation } from '../../components/userPanel/recommendation/Recommendation';
import { api } from '../api';

export interface Recommendation {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export interface CreateRecommendationDto {
  title: string;
  content: string;
  imageUrl?: string;
}

export interface UpdateRecommendationDto extends Partial<CreateRecommendationDto> {
  id: number;
}

export const recommendationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        //read
        getRecommendations: builder.query<Recommendation[], void>({
            query: () => '/articles',
            providesTags: ['Recommendations'],
        }),

        getRecommendationById: builder.query<Recommendation, string>({
            query: (id) => `/articles/${id}`,
            providesTags: (result, error, id) => [{type: 'Recommendations', id}],
        }),

        //write
        createRecommendation: builder.mutation<Recommendation, CreateRecommendationDto>({
            query: (body) =>  ({
                url: '/articles',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Recommendations'],
        }),

        updateRecommendation: builder.mutation<Recommendation, { id: number; body: CreateRecommendationDto }>({
            query: ({ id, body }) => ({ 
                url: `/articles/${id}`,
                method: 'PATCH',
                body: body,
            }),
            invalidatesTags: ['Recommendations'],
        }),

        deleteRecommendation: builder.mutation<void, number>({
            query: (id) => ({
                url: `/articles/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Recommendations'],
        }),
    }),
});

export const {
  useGetRecommendationsQuery,
  useGetRecommendationByIdQuery,
  useCreateRecommendationMutation,
  useUpdateRecommendationMutation,
  useDeleteRecommendationMutation,
} = recommendationsApi;