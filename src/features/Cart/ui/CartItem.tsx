import React from 'react';
import { Product } from 'src/entities/Product';
import AddToCart from './AddToCart';
import styles from './CartItem.module.scss';

export interface CartItemProps {
  product: Product;
  amount: number;
}

export const CartItem: React.FC<CartItemProps> = ({ product }) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.imageWrapper}>
        {product.photo ? (
          <img src={product.photo} alt={product.name} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>Нет фото</div>
        )}
      </div>

      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>
        {product.desc && <p className={styles.desc}>{product.desc}</p>}

        <div className={styles.priceSection}>
          {product.oldPrice && <span className={styles.oldPrice}>{product.oldPrice} ₽</span>}
          <span className={styles.price}>{product.price} ₽</span>
        </div>
      </div>

      <AddToCart productId={product.id} />
    </div>
  );
};
