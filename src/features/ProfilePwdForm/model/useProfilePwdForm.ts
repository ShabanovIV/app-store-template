import { FormInstance } from 'antd';
import { useChangePasswordMutation } from 'src/entities/User';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { useSuccessHandler } from 'src/shared/hooks/useSuccessHandler';
import { FieldType } from '../types/fields';

export const useProfilePassword = (form: FormInstance<FieldType>) => {
  const [changePassword, { isLoading, isSuccess, error }] = useChangePasswordMutation();
  const { errorElement } = useErrorHandler({ form, error });
  const { successElement } = useSuccessHandler({
    isSuccess,
    mess: 'Password successfully changed',
  });

  const changePass = async (password: string, newPassword: string) => {
    await changePassword({ password, newPassword });
  };

  return {
    changePass,
    errorElement,
    successElement: successElement,
    isLoading,
    isSuccess,
  };
};
