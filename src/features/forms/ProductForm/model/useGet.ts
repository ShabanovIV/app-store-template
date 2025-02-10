import { FormInstance } from 'antd';
import { useGetAllCategoriesQuery } from 'src/entities/Category';
import { useGetProductByIdQuery } from 'src/entities/Product';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { FieldType } from '../types/fields';

export const useGet = (skip: boolean, productId: string, form: FormInstance<FieldType>) => {
  const {
    data: dataCategories,
    isFetching: isFetchingCategories,
    error: errorCategories,
  } = useGetAllCategoriesQuery();
  const { data, refetch, isFetching, isSuccess, error } = useGetProductByIdQuery(productId, {
    skip,
  });
  useErrorHandler({ error: errorCategories });
  useErrorHandler({ form, error });

  return {
    data,
    dataCategories,
    refetch,
    isFetching: isFetching || isFetchingCategories,
    isSuccess,
  };
};
