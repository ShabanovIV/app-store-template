import React from 'react';
import { Card, Button, Space } from 'antd';
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
  return (
    <Card
      className={styles.categoryCard}
      title={category.name}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <Space>
        {onEdit && <Button onClick={onEdit}>Edit</Button>}
        {onRemove && (
          <Button danger onClick={onRemove}>
            Delete
          </Button>
        )}
      </Space>
    </Card>
  );
};
