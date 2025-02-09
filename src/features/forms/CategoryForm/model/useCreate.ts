import { FormInstance } from 'antd';
import { useCreateCategoryMutation } from 'src/entities/Category';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { useSuccessHandler } from 'src/shared/hooks/useSuccessHandler';
import { FieldType } from '../types/fields';

export const useCreate = (form: FormInstance<FieldType>) => {
  const [createCategory, { isLoading: isCreating, isSuccess: isCreatingSuccess, error }] =
    useCreateCategoryMutation();
  useErrorHandler({ form, error });
  useSuccessHandler({
    isSuccess: isCreatingSuccess,
    mess: 'Category created successfully',
  });

  const create = async () => {
    const updateBody = form.getFieldsValue();
    await createCategory(updateBody);
  };

  return {
    create,
    isCreating,
    isCreatingSuccess,
  };
};
