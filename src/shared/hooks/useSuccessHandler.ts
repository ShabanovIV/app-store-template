import { useCallback, useEffect } from 'react';
import { message } from 'antd';

interface UseSuccessHandlerProps {
  isSuccess: boolean;
  mess: string;
}

export const useSuccessHandler = ({ isSuccess, mess }: UseSuccessHandlerProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = useCallback(() => {
    messageApi.open({
      type: 'success',
      content: mess,
    });
  }, [mess]);

  useEffect(() => {
    if (isSuccess) {
      success();
    }
  }, [isSuccess, success]);

  return { successElement: contextHolder };
};
