import React from 'react';
import styles from './CartItem.module.scss';
import { CartItemProps } from '../types/cart';

export const CartItem: React.FC<CartItemProps> = ({ product, amount }) => {
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

      <div className={styles.actions}>
        <button className={styles.button}>−</button>
        <span className={styles.amount}>{amount}</span>
        <button className={styles.button}>+</button>
      </div>
    </div>
  );
};
