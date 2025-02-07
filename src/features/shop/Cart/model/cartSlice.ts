import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCart, saveCart } from '../lib/localStorage';
import { CartItemProps, CartState } from '../types/cart';

const initialState: CartState = getCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<CartItemProps>) {
      state.items.push(action.payload);
      saveCart(state);
    },
    updateCartItem(state, action: PayloadAction<CartItemProps>) {
      const index = state.items.findIndex((item) => item.product.id === action.payload.product.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      saveCart(state);
    },
    removeCartItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
      saveCart(state);
    },
    clearCartItems(state) {
      state.items = [];
      saveCart(state);
    },
  },
});

export const { addCartItem, updateCartItem, removeCartItem, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state: RootState) => state.cart.items;
