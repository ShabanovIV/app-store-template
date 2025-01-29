import { useEffect } from 'react';
import { useSigninMutation } from 'src/entities/User';
import { parseErrorAndThrow } from 'src/shared/api/errors';

export const useSignIn = () => {
  const [signin, { isLoading, isSuccess, isError, error }] = useSigninMutation();

  const signIn = async (email: string, password: string) => {
    await signin({ email, password });
  };

  useEffect(() => {
    if (isError && error) {
      parseErrorAndThrow(error);
    }
  }, [isError, error]);

  return {
    signIn,
    isLoading,
    isSuccess,
  };
};
