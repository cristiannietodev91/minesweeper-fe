import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  state: "loading" | "finished" | "processing";
  error?: string;
}

// Define the initial state using that type
const initialState: AppState = {
  state: "finished",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default appSlice.reducer;