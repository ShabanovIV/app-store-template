import { IRenderItem } from 'src/shared/ui/RenderList/IRenderItem';
import { ProductCard } from './ProductCard';
import { Product } from '../types/product';

interface ConvertProps {
  product: Product;
  onClick?: (id: string) => void;
}

export const convertToIRenderItem = ({ product, onClick }: ConvertProps): IRenderItem => ({
  key: product.id,
  render: () => (
    <ProductCard product={product} onClick={onClick ? () => onClick(product.id) : undefined} />
  ),
});
