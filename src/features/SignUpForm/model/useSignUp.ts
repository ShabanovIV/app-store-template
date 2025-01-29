import { useEffect, useState } from 'react';
import { useSignupMutation } from 'src/entities/User';
import { getFormErrors, upToErrBoundary } from 'src/shared/api/errors';

export const useSignUp = () => {
  const [signup, { isLoading, isError, error }] = useSignupMutation();
  const [fieldErrors, setFieldErrors] = useState<{ name: string; errors: string[] }[]>([]);

  const signUp = async (email: string, password: string) => {
    await signup({ email, password });
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
    signUp,
    isLoading,
    isFieldErrors: isError && fieldErrors.length > 0,
    fieldErrors,
  };
};
