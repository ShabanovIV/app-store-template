import { MouseEvent } from 'react';
import { Button, Space, Image, Divider, Card } from 'antd';
import styles from './ProductCard.module.scss';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  onRemove?: () => void;
  onEdit?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onRemove, onEdit }) => {
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
    <Card className={styles.productCard} onClick={handleClick}>
      {product.photo && (
        <Image className={styles.photo} preview={false} src={product.photo} alt={product.name} />
      )}

      <h3 className={styles.title}>{product.name}</h3>
      <p className={styles.title}>{product.desc}</p>

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
