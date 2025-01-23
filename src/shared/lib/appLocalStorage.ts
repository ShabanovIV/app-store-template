export const StorageKeys = {
  token: 'token',
  user: 'user',
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
