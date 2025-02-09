import { Button, Divider, Space, Spin } from 'antd';
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
      <RenderList isGrid={false} items={cartItems} />
      <Divider />
      {items.length > 0 && (
        <Button.Group>
          <Button onClick={() => navigate(ROUTES.category.path)}>Back to catalog</Button>
          <Button onClick={() => navigate(ROUTES.checkout.path)}>Proceed to Checkout</Button>
        </Button.Group>
      )}
    </div>
  );
};
