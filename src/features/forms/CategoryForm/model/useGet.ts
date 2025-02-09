import { FormInstance } from 'antd';
import { useGetCategoriesQuery } from 'src/entities/Category';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { FieldType } from '../types/fields';

export const useGet = (skip: boolean, categoryId: string, form: FormInstance<FieldType>) => {
  const { data, refetch, isFetching, isSuccess, error } = useGetCategoriesQuery(
    {
      ids: [categoryId],
    },
    { skip },
  );
  useErrorHandler({ form, error });

  return {
    data,
    refetch,
    isFetching,
    isSuccess,
  };
};
