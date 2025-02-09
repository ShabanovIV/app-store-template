import { FormInstance } from 'antd';
import { useUpdateProductMutation } from 'src/entities/Product';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { useSuccessHandler } from 'src/shared/hooks/useSuccessHandler';
import { FieldType } from '../types/fields';

export const useUpdate = (form: FormInstance<FieldType>) => {
  const [updateProduct, { isLoading: isUpdating, isSuccess: isUpdateSuccess, error }] =
    useUpdateProductMutation();
  useErrorHandler({ form, error });
  useSuccessHandler({
    isSuccess: isUpdateSuccess,
    mess: 'Data saved successfully',
  });

  const update = async () => {
    const body = form.getFieldsValue();
    await updateProduct(body);
  };

  return {
    update,
    isUpdating,
    isUpdateSuccess,
  };
};
