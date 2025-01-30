import { useEffect } from 'react';
import { message } from 'antd';
import { useChangePasswordMutation } from 'src/entities/User';
import { parseErrorAndThrow } from 'src/shared/api/errors';

export const useProfilePassword = () => {
  const [changePassword, { isLoading, isSuccess, isError, error }] = useChangePasswordMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };

  const changePass = async (password: string, newPassword: string) => {
    await changePassword({ password, newPassword });
  };

  useEffect(() => {
    if (isSuccess) {
      success();
    }
  }, [isSuccess, success]);

  useEffect(() => {
    if (isError && error) {
      parseErrorAndThrow(error);
    }
  }, [isError, error]);

  return {
    changePass,
    contextHolder,
    isLoading,
    isSuccess,
  };
};
