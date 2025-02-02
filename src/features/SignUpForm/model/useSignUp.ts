import { FormInstance } from 'antd';
import { useSignupMutation } from 'src/entities/User';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { FieldType } from '../types/fields';

export const useSignUp = (form: FormInstance<FieldType>) => {
  const [signup, { isLoading, isSuccess, error }] = useSignupMutation();
  const { errorElement } = useErrorHandler<FieldType>({ form, error });

  const signUp = async (email: string, password: string) => {
    await signup({ email, password });
  };

  return {
    signUp,
    errorElement,
    isLoading,
    isSuccess,
  };
};
