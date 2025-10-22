import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { authReducer } from "./features/authSlice";
import { authAPI } from "./api/authApi";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage par défaut
import { candidateAPI } from "./api/candidateApi";

// Combine tous tes reducers
const rootReducer = combineReducers({
  authReducer: persistReducer(
    {
      key: "auth",
      storage,
      whitelist: ["user", "isAuthenticated", "role"],
    },
    authReducer
  ),
  [authAPI.reducerPath]: authAPI.reducer,
  [candidateAPI.reducerPath]: candidateAPI.reducer,
});

// Création du store avec le reducer combiné et persisté
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authAPI.middleware, candidateAPI.middleware),
});

// Persistor pour PersistGate
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
