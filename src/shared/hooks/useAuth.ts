import { getToken } from 'src/shared/lib/appLocalStorage';

export const useAuth = (): boolean => {
  return Boolean(getToken());
};
