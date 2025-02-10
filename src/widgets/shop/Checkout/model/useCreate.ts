import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation, CreateBody } from 'src/entities/Order';
import { clearCart } from 'src/features/Cart';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { ROUTES } from 'src/shared/config/routes';
import { useAppDispatch } from 'src/shared/hooks/store';
import { useSuccessHandler } from 'src/shared/hooks/useSuccessHandler';

export const useCreate = () => {
  const [createOrder, { isLoading, isSuccess, error }] = useCreateOrderMutation();
  const dispatch = useAppDispatch();
  useErrorHandler({ error });
  useSuccessHandler({
    isSuccess,
    mess: 'Order created successfully',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearCart());
      navigate(ROUTES.orders.path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const create = async (body: CreateBody) => {
    await createOrder(body);
  };

  return {
    create,
    isLoading,
    isSuccess,
  };
};
