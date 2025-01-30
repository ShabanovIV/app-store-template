import { useAppSelector } from 'src/shared/hooks/store';
import { selectToken } from '../model/authSlice';

export const useAuth = () => {
  const token = useAppSelector(selectToken);
  return { isAuth: token !== null, token };
};
