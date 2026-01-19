import { buildCreateApi } from "@reduxjs/toolkit/query";
import { api } from "../api";

export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  role: 'USER' | 'ADMIN';
  description?: string;
  avatarUrl?: string;
  workingHours?: string | null;
  contactEmail?: string | null;
  city?: string | null;
  address?: string | null;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string; 
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  description?: string;
  avatarUrl?: string;
  workingHours?: string;
  contactEmail?: string;
  city?: string;
  address?: string;
}

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        signup: builder.mutation<AuthResponse, SignupRequest>({
            query: (credentials) => ({
                url: '/auth/signup',
                method: 'POST',
                body: credentials,
            }),
        }),

        getMe: builder.query<User, void>({
          query: () => '/auth/me',
          keepUnusedDataFor: 0, 
        }),

        updateProfile: builder.mutation<User, UpdateProfileRequest>({
        query: (body) => ({
            url: '/auth/profile',
            method: 'PATCH',
            body,
        }),
        }),
    }), 
});

export const { useLoginMutation, useSignupMutation, useUpdateProfileMutation, useGetMeQuery } = authApi;