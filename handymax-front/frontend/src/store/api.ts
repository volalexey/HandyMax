import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Auth', 'Services', 'Reviews', 'Orders', 'UrgentRequests', 'Recommendations', 'Portfolio'],

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',

        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers
        },
    }),

    endpoints: (builder) => ({}),
});