import { api } from '../api';

export interface StatsResponse {
  orders: {
    total: number;
    processed: number;
    waiting: number;
    rejected: number;
  };
  income: number;
  customers: {
    new: number;
    repeat: number;
    top: { name: string; phone: string; count: number }[];
  };
  services: { title: string; count: number }[];
}

export const statisticsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query<StatsResponse, string>({
      query: (period) => `/statistics?period=${period}`,
      keepUnusedDataFor: 60, 
    }),
  }),
});

export const { useGetStatisticsQuery } = statisticsApi;