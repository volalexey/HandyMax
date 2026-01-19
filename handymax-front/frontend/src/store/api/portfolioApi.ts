import { api } from '../api';

export interface PortfolioItem {
  id: number;
  imageUrl: string;
}

export const portfolioApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolio: builder.query<PortfolioItem[], void>({
      query: () => '/portfolio',
      providesTags: ['Portfolio'],
    }),
    addPortfolioItem: builder.mutation<PortfolioItem, { imageUrl: string }>({
      query: (body) => ({
        url: '/portfolio',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Portfolio'],
    }),
    deletePortfolioItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `/portfolio/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Portfolio'],
    }),
  }),
});

export const {
  useGetPortfolioQuery,
  useAddPortfolioItemMutation,
  useDeletePortfolioItemMutation,
} = portfolioApi;