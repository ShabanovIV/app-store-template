import { FormInstance } from 'antd';
import { useProfileQuery, useUpdateProfileMutation } from 'src/entities/User';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { useSuccessHandler } from 'src/shared/hooks/useSuccessHandler';
import { FieldType } from '../types/fields';

export const useProfile = (form: FormInstance<FieldType>) => {
  const { data, refetch, isLoading, isSuccess, error } = useProfileQuery();
  const [updateProfile, { isLoading: isUpdating, isSuccess: isUpdateSuccess, error: updateError }] =
    useUpdateProfileMutation();
  useErrorHandler({ form, error });
  useErrorHandler({ form, error: updateError });
  useSuccessHandler({
    isSuccess: isUpdateSuccess,
    mess: 'Data saved successfully',
  });

  const update = async (name: string) => {
    await updateProfile({ name });
  };

  return {
    data,
    refetch,
    update,
    isLoading,
    isUpdating,
    isUpdateSuccess,
    isSuccess,
  };
};
