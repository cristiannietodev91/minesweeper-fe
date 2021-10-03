import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SquareProps, SquareStatus } from "types";
import type { RootState } from "../store";

interface Position {
  x: number;
  y: number;
}

interface GameState {
  player: string;
  board: SquareProps[][];
}

// Define the initial state using that type
const initialState: GameState = {
  player: "Cristian",
  board: [
    [
      { hasMine: true, status: SquareStatus.Covered },
      { hasMine: false, status: SquareStatus.Covered },
      { hasMine: false, status: SquareStatus.Covered, numberOfMines: 5 },
    ],
    [
      { hasMine: true, status: SquareStatus.Covered },
      { hasMine: false, status: SquareStatus.Covered },
      { hasMine: false, status: SquareStatus.Covered, numberOfMines: 5 },
    ],
  ],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
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

export const { uncoveredField, flagField } = gameSlice.actions;

export const selectPlayer = (state: RootState) => state.gameReducer.player;
export const selectBoard = (state: RootState) => state.gameReducer.board;

export default gameSlice.reducer;
