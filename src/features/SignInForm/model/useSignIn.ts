import { FormInstance } from 'antd';
import { useSigninMutation } from 'src/entities/User';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { FieldType } from '../types/fields';

export const useSignIn = (form: FormInstance<FieldType>) => {
  const [signin, { isLoading, isSuccess, error }] = useSigninMutation();
  const { errorElement } = useErrorHandler<FieldType>({ form, error });

  const signIn = async (email: string, password: string) => {
    await signin({ email, password });
  };

  return {
    signIn,
    errorElement,
    isLoading,
    isSuccess,
  };
};
