// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Game } from 'types'


export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getListOfGames: builder.query<Game, string>({
      query: () => `players/getAll`,
    }),
  }),
})


export const { useGetListOfGamesQuery } = gameApi