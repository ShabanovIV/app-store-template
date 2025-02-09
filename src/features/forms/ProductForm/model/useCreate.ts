import { FormInstance } from 'antd';
import { useCreateProductMutation } from 'src/entities/Product';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { useSuccessHandler } from 'src/shared/hooks/useSuccessHandler';
import { FieldType } from '../types/fields';

export const useCreate = (form: FormInstance<FieldType>) => {
  const [createProduct, { isLoading: isCreating, isSuccess: isCreatingSuccess, error }] =
    useCreateProductMutation();
  useErrorHandler({ form, error });
  useSuccessHandler({
    isSuccess: isCreatingSuccess,
    mess: 'Product created successfully',
  });

  const create = async () => {
    const body = form.getFieldsValue();
    await createProduct(body);
  };

  return {
    create,
    isCreating,
    isCreatingSuccess,
  };
};
