import React from 'react';
import { Button, Space } from 'antd';
import styles from './CategoryCard.module.scss';
import { Category } from '../types/category';

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
  onRemove?: () => void;
  onEdit?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onClick,
  onRemove,
  onEdit,
}) => {
  const handleClick = (): void => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={styles.category} onClick={handleClick}>
      {category.photo && <img src={category.photo} alt={category.name} />}
      <h3>{category.name}</h3>
      <Space>
        {onEdit && <Button onClick={onEdit}>Edit</Button>}
        {onRemove && (
          <Button danger onClick={onRemove}>
            Delete
          </Button>
        )}
      </Space>
    </div>
  );
};
