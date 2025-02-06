import { useEffect } from 'react';
import { useMessage } from './useMessage';

interface UseSuccessHandlerProps {
  isSuccess: boolean;
  mess: string;
}

export const useSuccessHandler = ({ isSuccess, mess }: UseSuccessHandlerProps) => {
  const { showSuccess } = useMessage();

  useEffect(() => {
    if (isSuccess) {
      showSuccess(mess);
    }
  }, [isSuccess, mess, showSuccess]);
};
