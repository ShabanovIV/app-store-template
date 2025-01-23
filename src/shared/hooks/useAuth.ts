import { getItem, StorageKeys } from 'src/shared/lib/appLocalStorage';

export const useAuth = (): boolean => {
  return Boolean(getItem(StorageKeys.token));
};
