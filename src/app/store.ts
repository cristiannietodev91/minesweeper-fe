import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appReducer from "./reducers/appSlice";
import gameReducer from "./reducers/gameSlice";
import { gameApi } from "./services/games";

const rootReducer = combineReducers({
  appReducer,
  gameReducer,
  [gameApi.reducerPath]: gameApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gameApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
