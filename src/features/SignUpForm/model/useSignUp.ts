import { useEffect } from 'react';
import { useSignupMutation } from 'src/entities/User';
import { parseErrorAndThrow } from 'src/shared/api/errors';

export const useSignUp = () => {
  const [signup, { isLoading, isError, error }] = useSignupMutation();

  const signUp = async (email: string, password: string) => {
    await signup({ email, password });
  };

  useEffect(() => {
    if (isError && error) {
      parseErrorAndThrow(error);
    }
  }, [isError, error]);

  return {
    signUp,
    isLoading,
  };
};
