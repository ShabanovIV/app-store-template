import empty from 'src/shared/assets/images/empty.png';
import { formatPrice } from 'src/shared/lib/formats/formatPrice';
import styles from './ProductCard.module.scss';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  footer?: () => React.ReactNode;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, footer }) => {
  const sale =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) * 100) / product.oldPrice)
      : 0;

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <a href="#" onClick={(e) => e.preventDefault()} className={styles.cardImage}>
          <img src={product.photo ? product.photo : empty} alt={product.name} />
        </a>
        <div className={styles.cardLabel}>{`-${sale}%`}</div>
      </div>
      <div className={styles.cardBottom}>
        <div className={styles.cardPrices}>
          <div className={`${styles.cardPrices} ${styles.cardPriceDiscount}`}>
            {formatPrice(product.price)}
          </div>
          {product.oldPrice && (
            <div className={`${styles.cardPrices} ${styles.cardPriceCommon}`}>
              {formatPrice(product.oldPrice)}
            </div>
          )}
        </div>
        <a href="#" onClick={(e) => e.preventDefault()} className={styles.cardTitle}>
          {product.name}
        </a>
        <div className={styles.cardFooter}>{footer && footer()}</div>
      </div>
    </div>
  );
};
