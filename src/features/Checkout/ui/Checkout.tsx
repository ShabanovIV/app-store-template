import React from 'react';
import { Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from 'src/entities/Product';
import { ROUTES } from 'src/shared/config/routes';
import { IRenderItem } from 'src/shared/ui/RenderList/IRenderItem';
import { RenderList } from 'src/shared/ui/RenderList/RenderList';
import styles from './Checkout.module.scss';
import { calculateTotals } from '../lib/calculateTotals';
import { useCheckout } from '../model/useCheckout';
import { useCreate } from '../model/useCreate';

export const Checkout: React.FC = () => {
  const { products, order } = useCheckout();
  const { create } = useCreate();
  const { totalPrice, totalOldPrice, totalDiscount } = calculateTotals(products);
  const navigate = useNavigate();

  const items: IRenderItem[] =
    products.map((product) => ({
      key: product.id,
      render: () => <ProductCard product={product} />,
    })) ?? [];

  const handleCreate = () => {
    create(order);
  };

  return (
    <div className={styles.checkoutContainer}>
      <h1>Checkout</h1>
      <p>Please review your items and proceed to payment.</p>

      <RenderList items={items} />

      <div className={styles.summary}>
        <h2>Order Summary</h2>
        <p>
          <span>Total Price:</span> <span>{totalPrice} ₽</span>
        </p>
        {totalOldPrice > totalPrice && (
          <p>
            <span>Old Price:</span> <span className={styles.oldPrice}>{totalOldPrice} ₽</span>
          </p>
        )}
        {totalDiscount > 0 && (
          <p>
            <span>Discount:</span> <span className={styles.discount}>{totalDiscount}%</span>
          </p>
        )}
      </div>
      <Divider />
      <Button.Group>
        <Button onClick={() => navigate(ROUTES.cart.path)} className={styles.button}>
          Back to cart
        </Button>
        <Button onClick={handleCreate} className={styles.button}>
          Create order
        </Button>
      </Button.Group>
    </div>
  );
};
