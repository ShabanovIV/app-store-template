import { MouseEvent } from 'react';
import { Button, Space, Image, Divider, Card } from 'antd';
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

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const buttonType = e.currentTarget.dataset.type;

    if (buttonType === 'delete' && onRemove) {
      onRemove();
    } else if (buttonType === 'edit' && onEdit) {
      onEdit();
    }
  };

  return (
    <Card className={styles.categoryCard} onClick={handleClick}>
      {category.photo && (
        <Image className={styles.photo} preview={false} src={category.photo} alt={category.name} />
      )}

      <p className={styles.title}>{category.name}</p>

      {(onEdit || onRemove) && <Divider />}

      <Space className={styles.buttonSpace}>
        {onEdit && (
          <Button datatype="edit" onClick={handleButtonClick}>
            Edit
          </Button>
        )}
        {onRemove && (
          <Button datatype="delete" danger onClick={handleButtonClick}>
            Delete
          </Button>
        )}
      </Space>
    </Card>
  );
};
