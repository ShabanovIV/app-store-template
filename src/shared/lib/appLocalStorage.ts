import { API_COMMAND_ID } from 'src/shared/config/apiConfig';

const StorageKeys = {
  token: `token-${API_COMMAND_ID}`,
  user: `user-${API_COMMAND_ID}`,
} as const;

type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];

const setItem = (key: StorageKey, value: string): void => {
  localStorage.setItem(key, value);
};

const getItem = (key: StorageKey): string | null => {
  return localStorage.getItem(key);
};

const removeItem = (key: StorageKey): void => {
  localStorage.removeItem(key);
};

export const clearStorage = (): void => {
  localStorage.clear();
};

export const saveToken = (token: string): void => {
  setItem(StorageKeys.token, token);
};

export const getToken = (): string | null => {
  return getItem(StorageKeys.token);
};

export const removeToken = (): void => {
  removeItem(StorageKeys.token);
};
