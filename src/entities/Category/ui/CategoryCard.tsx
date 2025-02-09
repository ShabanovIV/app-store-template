import { ReactNode } from 'react';
import empty from 'src/shared/assets/images/empty.png';
import styles from './CategoryCard.module.scss';
import { Category } from '../types/category';

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
  footer?: () => ReactNode;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick, footer }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <a href="#" onClick={handleClick} className={styles.cardImage}>
          <img src={category.photo ? category.photo : empty} alt={category.name} />
        </a>
      </div>
      <div className={styles.cardBottom}>
        <a href="#" onClick={handleClick} className={styles.cardTitle}>
          {category.name}
        </a>
        {footer && footer()}
      </div>
    </div>
  );
};
