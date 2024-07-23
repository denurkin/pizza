import { createSlice } from "@reduxjs/toolkit";

export interface FilterSliceState {
  categoryId: number;
  sortType: {
    name: string;
    sortProperty: string;
  };
  pageFlowing: number | null;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sortType: {
    name: "популярности",
    sortProperty: "rating",
  },
  pageFlowing: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryid(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sortType = action.payload;
    },
    setFilter(state, action) {
      state.pageFlowing = Number(action.payload.pageFlowing);
      state.sortType = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryid, setSort, setFilter } = filterSlice.actions;
export default filterSlice.reducer;
