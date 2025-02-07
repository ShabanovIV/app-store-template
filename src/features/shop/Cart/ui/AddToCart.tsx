import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useAppDispatch, useAppSelector } from 'src/shared/hooks/store';
import styles from './AddToCart.module.scss';
import { selectProductAmount, updateAmount } from '../model/cartSlice';

export interface CounterProps {
  productId: string;
}

const AddToCart: React.FC<CounterProps> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const amount = useAppSelector((state) => selectProductAmount(state, productId));

  const handleDecrement = () => {
    if (amount > 0) {
      dispatch(updateAmount({ productId, quantity: amount - 1 }));
    }
  };

  const handleIncrement = () => {
    dispatch(updateAmount({ productId, quantity: amount + 1 }));
  };

  return (
    <div className={styles.containerCart}>
      {amount === 0 ? (
        <Button onClick={handleIncrement} className={styles.buttonAdd}>
          В корзину
        </Button>
      ) : (
        <Button.Group style={{ width: '6.6rem' }}>
          <Button style={{ width: '2rem' }} onClick={handleDecrement} icon={<MinusOutlined />} />
          <Space
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '2.6rem',
            }}
          >
            {amount}
          </Space>
          <Button style={{ width: '2rem' }} onClick={handleIncrement} icon={<PlusOutlined />} />
        </Button.Group>
      )}
    </div>
  );
};

export default AddToCart;
