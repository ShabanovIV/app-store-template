import { FormInstance } from 'antd';
import { useGetProductsQuery } from 'src/entities/Product';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { FieldType } from '../types/fields';

export const useGet = (skip: boolean, productId: string, form: FormInstance<FieldType>) => {
  const { data, refetch, isFetching, isSuccess, error } = useGetProductsQuery(
    {
      ids: [productId],
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
