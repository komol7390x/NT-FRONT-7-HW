import { configureStore } from "@reduxjs/toolkit";
import counter from "./reducer/counter-reduer";
import userReducer from "./reducer/user-reducer";
import { loadState, saveState } from "../storage/storage";

const persistedState = loadState("users");

export const store = configureStore({
  reducer: {
    counter,
    userReducer,
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState("users", store.getState());
});