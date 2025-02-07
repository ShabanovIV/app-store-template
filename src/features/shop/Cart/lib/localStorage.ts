import {
  getItem,
  removeItem,
  setItem,
  StorageKeys,
} from 'src/shared/lib/localStorage/appLocalStorage';
import { CartState } from '../types/cart';

export const getCart = (): CartState => {
  const stateStr = getItem(StorageKeys.cartState);
  try {
    return stateStr ? JSON.parse(stateStr) : { items: [] };
  } catch (error) {
    console.error('Parsing JSON error for localStorage:', error);
    return { items: [] };
  }
};

export const saveCart = (state: CartState) => {
  setItem(StorageKeys.cartState, JSON.stringify(state));
};

export const removeCart = () => {
  removeItem(StorageKeys.cartState);
};
