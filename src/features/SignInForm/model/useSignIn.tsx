import { useEffect } from 'react';
import { useSigninMutation } from 'src/entities/User';
import { upToErrBoundary } from 'src/shared/api/errors';

export const useSignIn = () => {
  const [signin, { isLoading, isError, error }] = useSigninMutation();

  const signIn = async (email: string, password: string) => {
    await signin({ email, password });
  };

  useEffect(() => {
    upToErrBoundary(error);
  }, [isError, error]);

  return {
    signIn,
    isLoading,
    isError,
    error,
  };
};
