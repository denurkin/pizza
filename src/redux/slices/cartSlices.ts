import { createSlice } from "@reduxjs/toolkit";

export type CartItem = {
  title: string;
  count: number;
  price: number;
  size: number;
  type: number;
  img: string;
};

interface CartSliceState {
  items: CartItem[];
  totalPrice: number;
}

const getCartFromLS = () => {
    const data = localStorage.getItem("cart");
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);

    return {
      items,
      totalPrice,
    };
  },
  calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((sum, obj) => {
      return obj.price * obj.count + sum;
    }, 0);
  };

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  items: items,
  totalPrice: totalPrice,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.title === action.payload.title &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItems(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.title === action.payload.title &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );
      if (findItem && findItem.count > 1) {
        findItem.count--;
      } else {
        state.items = state.items.filter((obj) => obj !== findItem);
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    plusItems(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.title === action.payload.title &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );
      if (findItem) {
        findItem.count++;
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    removeItems(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.title === action.payload.title &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );
      state.items = state.items.filter((obj) => obj !== findItem);

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItems, minusItems, plusItems, removeItems, clearItems } =
  cartSlice.actions;
export default cartSlice.reducer;
