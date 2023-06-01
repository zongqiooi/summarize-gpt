import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./article";

// store = global state that stores the entire information of the application
export const store = configureStore({
  // just stores the "slice of cake", which is only articleApi as the state instead of the entire state
  reducer: { [articleApi.reducerPath]: articleApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware),
});
