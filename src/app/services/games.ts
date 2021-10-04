// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateGameProps, Game, PlayerAttributes, StartGameProps } from "types";

export const gameApi = createApi({
  reducerPath: "gameApi",
  tagTypes: ["Games"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    getListOfGames: builder.query<Game, string>({
      query: () => `players/getAll`,
    }),
    loginUser: builder.mutation<PlayerAttributes, string>({
      query: (email) => ({
        url: `players/create`,
        method: "POST",
        body: { email },
      }),
    }),
    createGame: builder.mutation<Game, CreateGameProps>({
      query: (body) => ({
        url: `game/create`,
        method: "POST",
        body,
      }),
    }),
    startGame: builder.mutation<Game, StartGameProps>({
      query: ({ idgame, x, y }) => ({
        url: `game/startgame/${idgame}/${x}/${y}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetListOfGamesQuery,
  useLoginUserMutation,
  useCreateGameMutation,
  useStartGameMutation,
} = gameApi;
