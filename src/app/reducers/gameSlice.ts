import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GameStatus,
  GameStatusProps,
  PlayerAttributes,
  SquareProps,
  SquareStatus,
} from "types";
import type { RootState } from "../store";

interface Position {
  x: number;
  y: number;
}

interface GameState {
  player?: PlayerAttributes;
  board: SquareProps[][];
  gameStatus: GameStatus;
  idgame?: number;
}

// Define the initial state using that type
const initialState: GameState = {
  board: [],
  gameStatus: GameStatus.NoGameLoad,
};

const countMines = (x: number, y: number, board: SquareProps[][]) => {
  let mineCount = 0;
  const field = board[x][y];
  for (
    let i = Math.max(x - 1, 0);
    i <= Math.min(x + 1, board.length - 1);
    i++
  ) {
    for (
      let j = Math.max(y - 1, 0);
      j <= Math.min(y + 1, board.length - 1);
      j++
    ) {
      if (board[i][j].hasMine) {
        mineCount++;
      }
    }
  }
  board[x][y] = {
    ...field,
    status: SquareStatus.Uncovered,
    numberOfMines: mineCount,
  };
  if (mineCount === 0) {
    console.log("Mines to reveal", x, y);
    revealBoard(x, y, board);
  }
};

const revealBoard = (x: number, y: number, board: SquareProps[][]) => {
  //Reveal all adjacent cells as they do not have a mine
  for (
    let i = Math.max(x - 1, 0);
    i <= Math.min(x + 1, board.length - 1);
    i++
  ) {
    for (
      let j = Math.max(y - 1, 0);
      j <= Math.min(y + 1, board.length - 1);
      j++
    ) {
      //Recursive Call
      if (board[i][j].status === SquareStatus.Covered) {
        countMines(i, j, board);
      }
    }
  }
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
    setBoard: (state, action: PayloadAction<SquareProps[][]>) => {
      state.board = action.payload;
      return state;
    },
    setGame: (state, action: PayloadAction<GameStatusProps>) => {
      state.idgame = action.payload.idgame;
      state.gameStatus = action.payload.gameStatus;
      return state;
    },
    uncoveredField: (state, action: PayloadAction<Position>) => {
      const { x, y } = action.payload;
      const field = state.board[x][y];

      const { board } = state;

      countMines(x, y, board);

      state.board = board;

      if (field.hasMine) {
        state.gameStatus = GameStatus.Over;
      }

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

export const {
  uncoveredField,
  flagField,
  setLoggedUser,
  logOut,
  setBoard,
  setGame,
} = gameSlice.actions;

export const selectPlayer = (state: RootState) => state.gameReducer.player;
export const selectBoard = (state: RootState) => state.gameReducer.board;
export const selectGameStatus = (state: RootState) =>
  state.gameReducer.gameStatus;
export const selectGame = (state: RootState) => state.gameReducer.idgame;
export const selectRemainingMines = (state: RootState) =>
  Math.max(
    state.gameReducer.board.reduce(
      (acc, val) => acc + val.filter((x) => x.hasMine).length,
      0
    ) -
      state.gameReducer.board.reduce(
        (acc, val) =>
          acc + val.filter((x) => x.status === SquareStatus.Flag).length,
        0
      ),
    0
  );
export const selectWinGame = (state: RootState) =>
  state.gameReducer.board.reduce(
    (acc, val) => acc + val.filter((x) => x.hasMine).length,
    0
  ) ===
  state.gameReducer.board.reduce(
    (acc, val) =>
      acc +
      val.filter((x) => x.hasMine && x.status === SquareStatus.Flag).length,
    0
  );

export default gameSlice.reducer;
