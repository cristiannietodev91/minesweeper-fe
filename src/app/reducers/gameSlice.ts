import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface GameState {
    player: string;
  }
  
  // Define the initial state using that type
  const initialState: GameState = {
    player: "Cristian"
  };
  
  export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {},
  });
  
  export const selectPlayer = (state: RootState) =>
    state.gameReducer.player;
  
  export default gameSlice.reducer;