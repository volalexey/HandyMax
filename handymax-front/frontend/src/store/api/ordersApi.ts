import { api } from "../api";
import type { Service } from "./servicesApi";

export enum OrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  serviceId: number;
  service: Service;
}

export interface Order {
  id: number;
  createdAt: string;
  status: OrderStatus;
  totalPrice: number;
  userId: number;
  user?: { name: string; email: string };
  items: OrderItem[];
}

export interface CreateOrderDto {
  items: {
    serviceId: number;
    quantity: number;
  }[];
}

export const ordersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        //read
        getMyOrders: builder.query<Order[], void>({
            query: () => '/orders/my',
            providesTags: ['Orders'],
        }),

        getAllOrders: builder.query<Order[], void>({
            query: () => '/orders',
            providesTags: ['Orders'],
        }),

        getOrderById: builder.query<Order, string>({
            query: (id) => `/orders/${+id}`,
            providesTags: (result, error, id) => [{ type: 'Orders', id }],
        }),

        //write
        createOrder: builder.mutation<Order, CreateOrderDto>({
            query: (body) => ({
                url: '/orders',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Orders'],
        }),

        updateOrderStatus: builder.mutation<Order, { id: number; status: OrderStatus }>({
            query: ({id, status}) => ({
                url: '/orders/${id}/status',
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: (result, error, { id }) => [
                {type: 'Orders', id},
                {type: 'Orders', id: 'LIST'},
            ],
        }),
    }),
})

export const {
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
} = ordersApi;