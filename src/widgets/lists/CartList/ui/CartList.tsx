import { Button, Space, Spin } from 'antd';
import { CartItem } from 'src/features/Cart';
import { RenderList } from 'src/shared/ui/RenderList/RenderList';
import styles from './CartList.module.scss';
import { useCart } from '../model/useCart';

export const CartList = () => {
  const { items, isFetching } = useCart();

  console.log(items?.length);

  const cartItems =
    items?.map((itm) => ({
      key: itm.product.id,
      render: () => <CartItem product={itm.product} amount={itm.amount} />,
    })) ?? [];

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
    </div>
  );
};
