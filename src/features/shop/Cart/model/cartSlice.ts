import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCart, saveCart } from '../lib/localStorage';
import { CartState } from '../types/cart';

const initialState: CartState = getCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateAmount(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const { productId, quantity } = action.payload;
      if (quantity > 0) {
        state[productId] = quantity;
      } else {
        delete state[productId];
      }
      saveCart(state);
    },

    removeProduct(state, action: PayloadAction<string>) {
      delete state[action.payload];
      saveCart(state);
    },

    clearCart() {
      const newState: CartState = {};
      saveCart(newState);
      return newState;
    },
  },
});

export const { updateAmount, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectProductIds = (state: RootState) => Object.keys(state.cart);
export const selectCartItems = (state: RootState) => state.cart;
export const selectProductAmount = (state: RootState, productId: string) =>
  state.cart[productId] || 0;
