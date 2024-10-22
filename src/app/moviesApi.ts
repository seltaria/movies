import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RandomMovieResponse } from "../types";

export const moviesApi = createApi({
    reducerPath: "moviesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://cinemaguide.skillbox.cc/" }),
    endpoints: (builder) => ({
        getRandomMovie: builder.query<RandomMovieResponse, {}>({
            query: () => `/movie/random`
        }),
        getMovieById: builder.query<RandomMovieResponse, {id: string}>({
            query: (arg) => `/movie/${arg.id}`
        }),
        getTop10Movies: builder.query<RandomMovieResponse[], {}>({
            query: () => "/movie/top10"
        }),
        addFavorite: builder.mutation<{}, string>({
            query: (arg) => ({
                url: "/favorites",
                method: "POST",
                body: { id: arg },
                credentials: "include"
            }),
        }),
        removeFavorite: builder.mutation<{}, string>({
            query: (arg) => ({
                url: `/favorites/${arg}`,
                method: "DELETE",
                credentials: "include"
            })
        }),
        getFavorites: builder.query({
            query: () => ({
                url: "/favorites",
                method: "GET",
                credentials: "include"
            })
        }),
        getGenres: builder.query<string[], {}>({
            query: () => "/movie/genres"
        }),
        getMoviesByGenre: builder.query<RandomMovieResponse[], string>({
            query: (arg) => `/movie?genre=${arg}`
        }),
        getMoviesByTitle: builder.query<RandomMovieResponse[], string>({
            query: (arg) => `/movie?title=${arg}`
        })
    })
})

export const {
    useLazyGetRandomMovieQuery,
    useGetMovieByIdQuery,
    useGetTop10MoviesQuery,
    useAddFavoriteMutation,
    useGetFavoritesQuery,
    useLazyGetFavoritesQuery,
    useGetGenresQuery,
    useGetMoviesByGenreQuery,
    useLazyGetMoviesByTitleQuery,
    useRemoveFavoriteMutation,
} = moviesApi;