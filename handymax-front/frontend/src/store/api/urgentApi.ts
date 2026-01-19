import { api } from "../api";

export interface UrgentRequest {
  id: number;
  name: string;
  phone: string;
  description?: string;
  isProcessed: boolean;
  createdAt: string;
  workType?: string;
  arrivalTime?: string;
  imageUrl?: string;
}

export interface CreateUrgentRequestDto {
  workType?: string;
  arrivalTime?: string;
  name: string;
  phone: string;
  description?: string;
  imageUrl?: string;
}

export const urgentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        //admin read
        getAllUrgentRequests: builder.query<UrgentRequest[], void>({
            query: () => '/urgent-requests',
            providesTags: ['UrgentRequests']
        }),

        //client write
        createUrgentRequest: builder.mutation<UrgentRequest, CreateUrgentRequestDto>({
            query: (body) => ({
                url: '/urgent-requests',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['UrgentRequests'],
        }),

        //admin write
        toggleUrgentRequestStatus: builder.mutation<UrgentRequest, { id: number, isProcessed: boolean }> ({
            query: ({id, isProcessed}) => ({
                url: `/urgent-reqests/${id}`,
                method: 'PATCH',
                body: { isProcessed },
            }),
            invalidatesTags: ['UrgentRequests'],
        }),

        deleteUrgentRequest: builder.mutation<void, number>({
            query: (id) => ({
                url: `/urgent-requests/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UrgentRequests'],
        }),
    }),
});

export const {
  useGetAllUrgentRequestsQuery,
  useCreateUrgentRequestMutation,
  useToggleUrgentRequestStatusMutation,
  useDeleteUrgentRequestMutation,
} = urgentApi;