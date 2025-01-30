import { useEffect } from 'react';
import { useProfileQuery } from 'src/entities/User';
import { parseErrorAndThrow } from 'src/shared/api/errors';

export const useProfile = () => {
  const { data, refetch, isLoading, isSuccess, isError, error } = useProfileQuery();

  useEffect(() => {
    if (isError && error) {
      parseErrorAndThrow(error);
    }
  }, [isError, error]);

  return {
    refetch,
    data,
    isLoading,
    isSuccess,
  };
};
