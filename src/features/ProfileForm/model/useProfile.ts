import { FormInstance } from 'antd';
import { useProfileQuery, useUpdateProfileMutation } from 'src/entities/User';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { useSuccessHandler } from 'src/shared/hooks/useSuccessHandler';
import { FieldType } from '../types/fields';

export const useProfile = (form: FormInstance<FieldType>) => {
  const { data, refetch, isLoading, isSuccess, error } = useProfileQuery();
  const [updateProfile, { isLoading: isUpdating, isSuccess: isUpdateSuccess, error: updateError }] =
    useUpdateProfileMutation();
  const { errorElement } = useErrorHandler({ form, error });
  const { errorElement: errorUpdateElement } = useErrorHandler({ form, error: updateError });
  const { successElement } = useSuccessHandler({
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
    errorElement,
    errorUpdateElement,
    successElement,
    isLoading,
    isUpdating,
    isUpdateSuccess,
    isSuccess,
  };
};
