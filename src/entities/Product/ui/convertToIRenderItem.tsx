import { IRenderItem } from 'src/shared/ui/RenderList/IRenderItem';
import { ProductCard } from './ProductCard';
import { Product } from '../types/product';

interface ConvertProps {
  product: Product;
  onClick?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const convertToIRenderItem = ({
  product,
  onClick,
  onEdit,
  onDelete,
}: ConvertProps): IRenderItem => ({
  key: product.id,
  render: () => (
    <ProductCard
      product={product}
      onClick={onClick ? () => onClick(product.id) : undefined}
      onEdit={onEdit ? () => onEdit(product.id) : undefined}
      onRemove={onDelete ? () => onDelete(product.id) : undefined}
    />
  ),
});
