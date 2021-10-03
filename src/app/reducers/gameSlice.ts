import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerAttributes, SquareProps, SquareStatus } from "types";
import type { RootState } from "../store";

interface Position {
  x: number;
  y: number;
}

interface GameState {
  player?: PlayerAttributes;
  board: SquareProps[][];
}

// Define the initial state using that type
const initialState: GameState = {
  board: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<PlayerAttributes>) => {
      state.player = action.payload;
      return state;
    },
    logOut: (state) => {
      state.player = undefined;
      return state;
    },
    setNewBoard: (state, action: PayloadAction<SquareProps[][]>)=>{
      state.board = action.payload;
      return state;
    },
    uncoveredField: (state, action: PayloadAction<Position>) => {
      state.board[action.payload.x][action.payload.y] = {
        ...state.board[action.payload.x][action.payload.y],
        status: SquareStatus.Uncovered,
      };
      return state;
    },
    flagField: (state, action: PayloadAction<Position>) => {
      state.board[action.payload.x][action.payload.y] = {
        ...state.board[action.payload.x][action.payload.y],
        status:
          state.board[action.payload.x][action.payload.y].status ===
          SquareStatus.Flag
            ? SquareStatus.Covered
            : SquareStatus.Flag,
      };
      return state;
    },
  },
});

export const { uncoveredField, flagField, setLoggedUser, logOut, setNewBoard } =
  gameSlice.actions;

export const selectPlayer = (state: RootState) => state.gameReducer.player;
export const selectBoard = (state: RootState) => state.gameReducer.board;

export default gameSlice.reducer;
