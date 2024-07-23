import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type FetchPizzasArgs = {
  pageFlowing: number;
  categoryId: number;
  sortRes: string;
  sortDesc: boolean;
};

type Pizza = {
  id: number;
  title: string;
  img: string;
  size: number[];
  type: number[];
  price: number;
};

interface PizzaSliceState {
  searchValue: string;
  items: Pizza[];
  status: string;
  lengthPizzas: number;
}

const initialState: PizzaSliceState = {
  searchValue: "",
  items: [],
  status: "loading",
  lengthPizzas: 1,
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { pageFlowing, categoryId, sortRes, sortDesc } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://6619207f9a41b1b3dfbef348.mockapi.io/items?page=${pageFlowing}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortRes}&order=${sortDesc ? "desc" : "ask"}`
    );
    return data;
  }
);

const pizzaSlices = createSlice({
  name: "pizzaSlices",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setSearchValue } = pizzaSlices.actions;
export default pizzaSlices.reducer;
