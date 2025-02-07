import { API_COMMAND_ID } from 'src/shared/config/apiConfig';

export const StorageKeys = {
  token: `token-${API_COMMAND_ID}`,
  user: `user-${API_COMMAND_ID}`,
  cartState: `cart-${API_COMMAND_ID}`,
} as const;

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];

export const setItem = (key: StorageKey, value: string): void => {
  localStorage.setItem(key, value);
};

export const getItem = (key: StorageKey): string | null => {
  return localStorage.getItem(key);
};

export const removeItem = (key: StorageKey): void => {
  localStorage.removeItem(key);
};

export const clearStorage = (): void => {
  localStorage.clear();
};
