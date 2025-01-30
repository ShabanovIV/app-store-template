import { useEffect } from 'react';
import { useUpdateProfileMutation } from 'src/entities/User';
import { parseErrorAndThrow } from 'src/shared/api/errors';

export const useProfileUpdate = () => {
  const [updateProfile, { isLoading, isSuccess, isError, error }] = useUpdateProfileMutation();

  const update = async (name: string) => {
    await updateProfile({ name });
  };

  useEffect(() => {
    if (isError && error) {
      parseErrorAndThrow(error);
    }
  }, [isError, error]);

  return {
    update,
    isLoading,
    isSuccess,
  };
};
