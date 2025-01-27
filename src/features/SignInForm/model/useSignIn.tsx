import { useSigninMutation } from 'src/entities/User';

export const useSignIn = () => {
  const [signin, { isLoading, isError, error }] = useSigninMutation();

  const signIn = async (email: string, password: string) => {
    try {
      await signin({ email, password }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    signIn,
    isLoading,
    isError,
    error,
  };
};
