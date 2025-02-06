import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, InputNumber, Space } from 'antd';
import styles from './AddToCart.module.scss';

export interface AddToCartProps {
  initialCount: number;
  onCountChanged: (count: number) => void;
}

const AddToCart: React.FC<AddToCartProps> = ({ initialCount, onCountChanged }) => {
  const [count, setCount] = useState(initialCount);
  if (count === 0) {
    return <div className={styles.containerCart}>d</div>;
  }

  useEffect(() => {
    onCountChanged(count);
  }, [count, onCountChanged]);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <Space className={styles.containerCart}>
      <Button className={styles.buttonCart} onChange={handleIncrement}>
        <PlusOutlined />
      </Button>
      <InputNumber
        className={styles.inputCart}
        title="Введите количество товара"
        type="text"
        defaultValue={0}
        value={count}
        onChange={(value) => setCount(value ?? 0)}
      />
      <Button className={styles.buttonCart} onChange={handleDecrement}>
        <PlusOutlined />
      </Button>
    </Space>
  );
};

export default AddToCart;
