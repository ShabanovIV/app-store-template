import { formatPrice } from 'src/shared/lib/formats/formatPrice';
import styles from './OrderItem.module.scss';
import { Order } from '../types/order';

interface OrderItemProps {
  order: Order;
}

export const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.orderId}>Order ID: {order.id}</span>
        <span className={styles.status}>{order.status}</span>
      </div>
      <div className={styles.products}>
        {order.products.map((product, index) => (
          <div key={index} className={styles.product}>
            <span className={styles.productName}>
              {product.product ? product.product.name : 'Unknown Product'}
            </span>
            <span className={styles.productQuantity}>x{product.quantity}</span>
            <span className={styles.productPrice}>
              {product.product ? formatPrice(product.product.price) : formatPrice(0)}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <span className={styles.createdAt}>
          Created at: {new Date(order.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
