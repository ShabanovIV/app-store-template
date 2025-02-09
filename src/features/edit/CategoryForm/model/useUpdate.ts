import { FormInstance } from 'antd';
import { useUpdateCategoryMutation } from 'src/entities/Category';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { useSuccessHandler } from 'src/shared/hooks/useSuccessHandler';
import { FieldType } from '../types/fields';

export const useUpdate = (form: FormInstance<FieldType>) => {
  const [updateCategory, { isLoading: isUpdating, isSuccess: isUpdateSuccess, error }] =
    useUpdateCategoryMutation();
  useErrorHandler({ form, error });
  useSuccessHandler({
    isSuccess: isUpdateSuccess,
    mess: 'Data saved successfully',
  });

  const update = async () => {
    const updateBody = form.getFieldsValue();
    await updateCategory(updateBody);
  };

  return {
    update,
    isUpdating,
    isUpdateSuccess,
  };
};
