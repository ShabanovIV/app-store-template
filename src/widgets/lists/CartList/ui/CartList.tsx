import { Button, Space, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CartItem } from 'src/features/Cart';
import { ROUTES } from 'src/shared/config/routes';
import { RenderList } from 'src/shared/ui/RenderList/RenderList';
import styles from './CartList.module.scss';
import { useCart } from '../model/useCart';

export const CartList = () => {
  const { items, isFetching } = useCart();
  const navigate = useNavigate();

  const cartItems = items.map((itm) => ({
    key: itm.product.id,
    render: () => <CartItem product={itm.product} amount={itm.amount} />,
  }));

  const handleProceedToCheckout = () => {
    navigate(ROUTES.checkout.path);
  };

  return (
    <div className={styles.listWrapper}>
      {isFetching && (
        <Button.Group>
          <Spin />
          <Space
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Cart loading...
          </Space>
        </Button.Group>
      )}
      <RenderList items={cartItems} />
      {items.length > 0 && <Button onClick={handleProceedToCheckout}>Proceed to Checkout</Button>}
    </div>
  );
};
