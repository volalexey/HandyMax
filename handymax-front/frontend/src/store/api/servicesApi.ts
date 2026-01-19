import { api } from "../api";

export interface Service {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
}

export interface CreateServiceDto {
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
}

export interface UpdateServiceDto extends Partial<CreateServiceDto> {
    id: number;
}

export const servicesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        //read
        getServices: builder.query<Service[], void>({
            query: () => '/services',
            providesTags: (result) =>
                result
                 ? [
                    ...result.map(({id}) => ({ type: 'Services' as const, id})),
                    { type: 'Services', id: 'LIST' },
                 ] : [{type: 'Services', id: 'LIST'}],
        }),

        getServiceById: builder.query<Service, string>({
            query: (id) => `/services/${id}`,
            providesTags: (result, error, id) => [{ type: 'Services', id }],
        }),
        //write
        createService: builder.mutation<Service, CreateServiceDto>({
            query: (body) => ({
                url: '/services',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Services'],
        }),

        updateService: builder.mutation<Service, UpdateServiceDto>({
            query: ({ id, ...body }) => ({
                url: `/services/${id}`,
                method: 'PATCH',
                body,
            }),

            invalidatesTags: (result, error,  { id }) => [
                { type: 'Services', id },
                { type: 'Services', id: 'LIST' }
            ],
        }),

        deleteService: builder.mutation<{ success: Boolean; id: number }, number>({
            query: (id) => ({
                url: `/services/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Services', id: 'LIST' }],
        }),
    })
})

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;