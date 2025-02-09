import { FormInstance } from 'antd';
import { useGetCategoriesQuery } from 'src/entities/Category';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { FieldType } from '../types/fields';

export const useGet = (form: FormInstance<FieldType>) => {
  const categoryId = form.getFieldsValue().id;
  const { data, refetch, isFetching, isSuccess, error } = useGetCategoriesQuery({
    ids: [categoryId],
  });
  useErrorHandler({ form, error });

  return {
    data,
    refetch,
    isFetching,
    isSuccess,
  };
};
