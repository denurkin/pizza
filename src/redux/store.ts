import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlices.ts";
import cart from "./slices/cartSlices.ts";
import pizzas from "./slices/pizzaSlices.ts";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { filter, cart, pizzas },
});

export type RootStateType = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
