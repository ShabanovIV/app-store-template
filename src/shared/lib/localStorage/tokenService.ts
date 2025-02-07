import { getItem, removeItem, setItem, StorageKeys } from './appLocalStorage';

export const saveToken = (token: string): void => {
  setItem(StorageKeys.token, token);
};

export const getToken = (): string | null => {
  return getItem(StorageKeys.token);
};

export const removeToken = (): void => {
  removeItem(StorageKeys.token);
};
