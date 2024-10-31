import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://cinemaguide.skillbox.cc/" }),
    tagTypes: ["Profile"],
    endpoints: (builder) => ({
        login: builder.mutation<{email: string, password: string}, {}>({
            query: (arg) => ({
                url: "/auth/login",
                method: "POST",
                body: arg,
                credentials: "include"
            }),
            invalidatesTags: ["Profile"]
        }),
        register: builder.mutation<
            {result: boolean},
            {email: string, password: string, name: string, surname: string}
            >({
            query: (arg) => ({
                url: "/user",
                method: "POST",
                body: arg
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout", 
                credentials: "include"
            }),
            invalidatesTags: ["Profile"]
        }),
        getProfileData: builder.query<{
            favorites: number[],
            surname: string,
            name: string,
            email: string
          }, {}>({
            query: () => ({
                url: "/profile",
                credentials: "include",
            }),
            providesTags: ["Profile"]
        })
    })
});

export const {
    useGetProfileDataQuery,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
} = authApi;