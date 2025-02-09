import { CreateBody, OrderStatus } from 'src/entities/Order/types/order';
import { useGetProductsQuery } from 'src/entities/Product';
import { selectCartItems } from 'src/features/Cart/model/cartSlice';
import { useAppSelector } from 'src/shared/hooks/store';

export const useCheckout = () => {
  const cartItems = useAppSelector((state) => selectCartItems(state));
  const ids = Object.keys(cartItems);
  const { data, isFetching } = useGetProductsQuery({ ids }, { refetchOnMountOrArgChange: true });

  const order: CreateBody = {
    products: ids
      .map((id) => ({
        id,
        quantity: cartItems[id],
      }))
      .filter((item) => item.quantity > 0),
    status: OrderStatus.Processing,
  };

  const products = data?.data ?? [];

  return {
    products,
    order,
    isFetching,
  };
};
