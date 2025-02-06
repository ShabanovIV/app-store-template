import { useEffect, useState } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, InputNumber } from 'antd';
import styles from './AddToCart.module.scss';

export interface AddToCartProps {
  initialCount?: number;
  onCountChanged?: (count: number) => void;
}

const AddToCart: React.FC<AddToCartProps> = ({ initialCount = 0, onCountChanged }) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  useEffect(() => {
    if (onCountChanged) {
      onCountChanged(count);
    }
  }, [count, onCountChanged]);

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));

  return count === 0 ? (
    <button className={styles.buttonAdd} onClick={handleIncrement}>
      В корзину
    </button>
  ) : (
    <div className={styles.containerCart}>
      <Button className={styles.buttonCart} onClick={handleDecrement}>
        <MinusOutlined />
      </Button>
      <InputNumber
        controls={false}
        className={styles.inputCart}
        readOnly
        min={0}
        max={999}
        type="number"
        value={count}
        onChange={(count) => setCount(count ?? 0)}
      />
      <Button className={styles.buttonCart} onClick={handleIncrement}>
        <PlusOutlined />
      </Button>
    </div>
  );
};

export default AddToCart;
