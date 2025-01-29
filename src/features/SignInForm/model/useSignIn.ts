import { useEffect, useState } from 'react';
import { useSigninMutation } from 'src/entities/User';
import { getFormErrors, upToErrBoundary } from 'src/shared/api/errors';

export const useSignIn = () => {
  const [signin, { isLoading, isError, error }] = useSigninMutation();
  const [fieldErrors, setFieldErrors] = useState<{ name: string; errors: string[] }[]>([]);

  const signIn = async (email: string, password: string) => {
    await signin({ email, password });
  };

  useEffect(() => {
    if (isError && error) {
      upToErrBoundary(error);
      setFieldErrors(getFormErrors(error));
    } else {
      setFieldErrors([]);
    }
  }, [isError, error]);

  return {
    signIn,
    isLoading,
    isFieldErrors: isError && fieldErrors.length > 0,
    fieldErrors,
  };
};
