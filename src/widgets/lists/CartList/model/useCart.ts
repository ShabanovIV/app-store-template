import { useGetProductsQuery } from 'src/entities/Product';
import { selectCartItems, selectProductIds } from 'src/features/Cart/model/cartSlice';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { useAppSelector } from 'src/shared/hooks/store';

export const useCart = () => {
  const ids = useAppSelector((state) => selectProductIds(state));
  const cart = useAppSelector((state) => selectCartItems(state));
  const { data, isFetching, error } = useGetProductsQuery(
    { ids },
    { refetchOnMountOrArgChange: true },
  );
  useErrorHandler({ error });

  const items =
    ids.length === 0
      ? []
      : (data?.data.map((product) => ({ product, amount: cart[product.id] })) ?? []);

  return {
    items,
    isFetching,
  };
};
